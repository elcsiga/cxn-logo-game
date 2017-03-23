import React from 'react';
import PathSeq from 'pathseg';
import Matter from 'matter-js';
import $ from 'jquery';

const logoSVG = require('../resources/logo_segments_3.svg');

class Scene extends React.Component {
    componentDidMount() {
        // create an engine
        const engine = Matter.Engine.create();

        const width = this.props.width;
        const height = this.props.height;

        // create a renderer
        const render = Matter.Render.create({
            element: this.sceneElement,
            engine: engine,
            options: {
                width: width,
                height: height,

                wireframes: true,
                showInternalEdges: true
            }
        });


        const self = this;
        $.get(logoSVG).done(function(data) {

            var vertexSets = [];

            $(data).find('path').each(function(i, path) {
                vertexSets.push(Matter.Svg.pathToVertices(path, 30));
            });

            const convertedVertexSets = vertexSets.map(vertexSet => vertexSet.map( wertex => ({
                x: wertex.x*10,
                y: wertex.y*10
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


            // create two boxes and a ground
            const balls = [];

            for (let i = 0; i<10; i++) {
                balls.push(Matter.Bodies.circle(width/2, i*10+30, 6));
            }
            Matter.World.add(engine.world, balls);

            const ground = Matter.Bodies.rectangle(width/2, height, width, 10, {isStatic: true});
            Matter.World.add(engine.world, [ground]);
        });

        // run the engine
        Matter.Engine.run(engine);

        // run the renderer
        Matter.Render.run(render);

        window.addEventListener('deviceorientation', function(event) {
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
        }, true);
    }

    render() {
        return (
            <div
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    border: '1px solid blue',
                    margin: '0 auto'
                }}
                ref={(e) => this.sceneElement = e}>
            </div>
        );
    }
}

Scene.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};
export default Scene;
