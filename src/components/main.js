require('normalize.css/normalize.css');

window.decomp = require('poly-decomp');
console.log (window.decomp);

import React from 'react';
import Scene from './scene';
import LandingPage from './LandingPage';

// const LandingPage = createFactory(LandingPageClass);

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Chemaxon Logo game</h1>

                <Scene
                    width={500}
                    height={500}
                />
                <LandingPage/>

            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
