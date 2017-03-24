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
                // justifyContent: 'space-between',
                flexDirection: 'column',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                fontFamily: 'Roboto, sans-serif'
            }
        }, this.renderMask(), this.renderTitle(), this.props.scores.map((score, index) => this.renderScore(score, index)), this.renderBack());
    }

    renderMask() {
        return DOM.div({
            style: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                opacity: '0.5',
                backgroundColor: 'white',
                zIndex: 100
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
                textAlign: 'center',
                zIndex: 150
            }
        }, 'Scores');
    }

    renderScore(score, index) {
        console.log(score)
        return DOM.div({
            key: index,
            style: {
                width: '200px',
                fontSize: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 150
            }
        }, this.renderName(score.name), this.renderResult(score.score));
    }

    renderName(name) {
        return DOM.div(null, name);
    }

    renderResult(score) {
        return DOM.div(null, score);
    }

    renderBack() {
        return DOM.div({
            style: {
                zIndex: 150
            }
        }, DOM.button({
            style: {
                height: '50px',
                width: '100px'
            },
            onClick: () => this.props.back()
        }, 'New Game'));
    }
}

export default ScoresPage;
