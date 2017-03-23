import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Scene from './components/scene';
import LandingPage from './components/LandingPage';

const appElement = document.getElementById('app');

function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

function renderScene() {
    ReactDOM.unmountComponentAtNode(appElement);
    ReactDOM.render(<Scene width={window.innerWidth} height={window.innerHeight}/>, appElement);
}

function handleFullscreenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        window.screen.orientation.lock('portrait-primary').then(renderScene).catch(renderScene);
    }
}

ReactDOM.render(<LandingPage/>, appElement);

document.addEventListener('click', requestFullscreen);

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('onmsfullscreenchange', handleFullscreenChange);
