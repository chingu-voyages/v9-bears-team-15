import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Components */
import StockSearch from './stocks/StockSearch';

class App extends Component {
    render() {
        return(
            <h1>Bears Stock Game!</h1>
            <StockSearch />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));