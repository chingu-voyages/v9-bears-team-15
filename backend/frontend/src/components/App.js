import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';


/* Components */
import StockSearch from './stocks/StockSearch';

class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <Fragment>
                    <h1>Bears Stock Game!</h1>
                    <StockSearch />
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));