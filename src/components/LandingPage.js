'use strict';

import {DOM, Component, createElement} from 'react';
import logoImage from '../resources/logo.svg'
import FacebookLogin from 'react-facebook-login';

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

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'LandingPage';

        this.state = {
            userName: null
        }
    }

    componentDidMount() {
        this.checkLoginState();
    }

    render() {
        return DOM.div({
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
            }
        }, this.renderLogo(), this.renderTitle(), this.renderStart());
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
                opacity: '0.2',
                pointerEvents: 'none'
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
                width: '60%',
                textAlign: 'center'
            }
        }, 'Move your ball into the hole!');
    }

    renderStart() {
        return DOM.div({
            style: {
                height: '100%',
                display: 'flex',
                paddingTop: '30px',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
            }
        }, this.renderStartButton());
    }

    renderStartButton() {
        return DOM.div({
            style: {
                paddingTop: '10px'
            }
        }, DOM.button({
            style: {
                height: '50px',
                width: '200px',
                backgroundColor: 'cadetblue',
                fontWeight: '700',
                fontSize: '16px'
            },
            onClick: requestFullscreen
        }, 'Start Chemaxon Logo game'));
    }

    renderLogin() {
        if (this.state.userName) {
            return null;
        }

        return (
            createElement(FacebookLogin, {
                appId: '332367813827911',
                autoLoad: true,
                fields: 'name',
                onClick: this.checkLoginState.bind(this),
                callback: this.checkLoginState.bind(this)
            })
        );
    }

    onLoginClick() {
        this.checkLoginState();
    }

    checkLoginState() {
        if (window.FB) {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    FB.api(
                        '/' + response.authResponse.userID,
                        (response) => {
                            if (response && !response.error) {
                                this.setState({
                                    userName: response.name
                                })
                            }
                        }
                    );
                }
            });
        }
    }
}

export default LandingPage;
