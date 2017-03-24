'use strict';

import {DOM, Component, createFactory, PropTypes, createElement} from 'react';

class ScoresPage extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'ScoresPage';

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
                justifyContent: 'space-between',
                flexDirection: 'column',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                fontFamily: 'Roboto, sans-serif'
            }
        }, this.renderMask(), this.renderTitle(), this.props.scores.map(score => this.renderScore(score)));
    }

    renderMask() {
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
                fontWeight: '700',
                width: '60%',
                textAlign: 'center'
            }
        }, 'Scores');
    }

    renderScore(score) {
        return (
            DOM.div({
                style: {
                    width: '200px',
                    fontSize: '30px'
                }
            }, 'Start game')
        )
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
}

export default ScoresPage;
