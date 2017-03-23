'use strict';

import {DOM, Component, createFactory, PropTypes} from 'react';
import logoImage from '../resources/logo.svg'

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'LandingPage';
    }

    render() {
        return DOM.div({
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'column',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }
        }, this.renderLogo(), this.renderTitle());
    }

    renderLogo() {
        return DOM.div({
            style: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: `url('${logoImage}')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: '0.2'
            }
        });
    }

    renderTitle() {
        return DOM.div({
            style: {
                paddingTop: '30px',
                fontSize: '60px',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '700',
                width: '60%'
            }
        }, 'Move your ball into the hole!');
    }
}

export default LandingPage;
