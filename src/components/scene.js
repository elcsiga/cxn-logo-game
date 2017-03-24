import React from 'react';
import PathSeq from 'pathseg';
import Matter from 'matter-js';
import $ from 'jquery';

const logoSVG = require('../resources/logo_segments_5.svg');
const ballPNG = require('../resources/ball.png');
//const ballShadowPNG = require('../resources/ball.png');
const backgroundPNG = require('../resources/wood_full.png');
const logoPNG = require('../resources/wood_layer.png');


class Scene extends React.Component {

    constructor(props) {
        super(props);
        this.width = props.width;
        this.height = props.height;

        this.ballSize = 7;
        this.ballImageContentRatio = 0.3; //how big is the ball in the full transparent image

        this.scaleFactor = 10;
        this.offsetX = -.5 * this.scaleFactor / 15; //calibration based on then origo inside svg
        this.offsetY = -73.5 * this.scaleFactor / 15;
        this.debug = false;
    }

    componentDidMount() {
        // create an engine
        const engine = Matter.Engine.create();
        engine.world.gravity.x = 0;
        engine.world.gravity.y = 0.5;

        const width = this.width;
        const height = this.height;
        const ballSize = this.ballSize;
        const ballImageContentRatio = this.ballImageContentRatio;
        const scaleFactor = this.scaleFactor;
        const debug = this.debug;

        // create a renderer
        const render = Matter.Render.create({
            element: this.sceneElement,
            engine: engine,
            options: {
                width: width,
                height: height,

                wireframes: true,
                background: 'rgba(0,0,0,0.5)',

                showSleeping: false,
                showDebug: true,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showCollisions: false,
                showSeparations: false,
                showAxes: true,
                showPositions: true,
                showAngleIndicator: false,
                showIds: false,
                showShadows: false,
                showVertexNumbers: false,
                showConvexHulls: false,
                showInternalEdges: true,
                showMousePosition: false
            }
        });

        const balls = [];
        const ballsImgs = [];


        const self = this;
        $.get(logoSVG).done(function(data) {

            var vertexSets = [];

            $(data).find('path').each(function(i, path) {
                vertexSets.push(Matter.Svg.pathToVertices(path, 30));
            });

            const convertedVertexSets = vertexSets.map(vertexSet => vertexSet.map( wertex => ({
                x: wertex.x*scaleFactor,
                y: wertex.y*scaleFactor
            })));

            const logo = Matter.Bodies.fromVertices(width/2, height/2, convertedVertexSets, {
                isStatic: true,
                render: {
                    fillStyle: '#2e2b44',
                    strokeStyle: '#2e2b44',
                    lineWidth: 1
                }
            }, true);

            Matter.World.add(engine.world, logo);

            // bslld
            for (let i = 0; i<10; i++) {
                balls.push(Matter.Bodies.circle(width/2, i*10+30, ballSize));

                var img = document.createElement("IMG");
                img.src = ballPNG;
                img.style.width = 2*ballSize/ballImageContentRatio+'px';
                img.style.height = 2*ballSize/ballImageContentRatio+'px';
                img.style.position = 'absolute';
                img.style.top = '100px';
                img.style.left = '100px';
                if (debug)
                    img.style.opacity = 0.1;
                self.ballContainer.appendChild(img);

                ballsImgs.push(img);
            }
            Matter.World.add(engine.world, balls);


            const groundWidth = 10;
            const w = width;
            const h = height;
            Matter.World.add(engine.world, [
                Matter.Bodies.rectangle(w/2, 0,   w, groundWidth, {isStatic: true}),
                Matter.Bodies.rectangle(w/2, h,   w, groundWidth, {isStatic: true}),
                Matter.Bodies.rectangle(0,   h/2, groundWidth, h, {isStatic: true}),
                Matter.Bodies.rectangle(w,   h/2, groundWidth, h, {isStatic: true}),
            ]);
        });

        // run the engine
        Matter.Engine.run(engine);

        // run the renderer
        if (debug)
            Matter.Render.run(render);

        //let a = 0;
        (function renderBalls() {
            window.requestAnimationFrame(renderBalls);
            for (let i = 0; i<balls.length; i++) {
                const pos = balls[i].position;
                const img = ballsImgs[i];
                img.style.left = pos.x - ballSize/ballImageContentRatio + 'px';
                img.style.top = pos.y - ballSize/ballImageContentRatio + 'px';
            }
            //a+= 0.005;
            //engine.world.gravity.x = Math.sin(a);
            //engine.world.gravity.y = Math.cos(a);
        })();

        this.orentationHandler = function(event) {
            const orientation = window.orientation;
            const gravity = engine.world.gravity;

            if (orientation === 0) {
                gravity.x = Matter.Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(event.beta, -90, 90) / 90;
            } else if (orientation === 180) {
                gravity.x = Matter.Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(-event.beta, -90, 90) / 90;
            } else if (orientation === 90) {
                gravity.x = Matter.Common.clamp(event.beta, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(-event.gamma, -90, 90) / 90;
            } else if (orientation === -90) {
                gravity.x = Matter.Common.clamp(-event.beta, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(event.gamma, -90, 90) / 90;
            }
        };
        window.addEventListener('deviceorientation', this.orentationHandler, true);

        this.engine = engine;
    }

    componentWillUnMount() {
        window.removeEventListener('deviceorientation', this.orentationHandler);
        Matter.Engine.clear(this.engine);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: this.width,
                        height: this.height,
                        margin: 0
                    }}
                    ref={(e) => this.sceneElement = e}>
                </div>
                <img
                    src = {backgroundPNG}
                    style={{
                        position: 'absolute',
                        left: this.width / 2 -(30 * this.scaleFactor) /2 + this.offsetX,
                        top: this.height / 2 -(40 * this.scaleFactor) /2 + this.offsetY,
                        width: 30 * this.scaleFactor,
                        height: 40 * this.scaleFactor,
                        opacity: this.debug ? 0.1 : 1
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: this.width,
                        height: this.height,
                        margin: 0
                    }}
                    ref={(e) => this.ballContainer = e}>
                </div>
                <img
                    src = {logoPNG}
                    style={{
                        position: 'absolute',
                        left: this.width / 2 -(30 * this.scaleFactor) /2 + this.offsetX,
                        top: this.height / 2 -(40 * this.scaleFactor) /2 + this.offsetY,
                        width: 30 * this.scaleFactor,
                        height: 40 * this.scaleFactor,
                        opacity: this.debug ? 0.1 : 1
                    }}
                />
            </div>
        );
    }
}

Scene.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};
export default Scene;
