import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';


/* Components */
import StockSearch from './stocks/StockSearch';
import StockList from './stocks/StockList';

class App extends Component {
    render() {
        return(
            <Provider store={store}>    
                <h1>Bears Stock Game!</h1>
                <StockSearch />
                <StockList />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));