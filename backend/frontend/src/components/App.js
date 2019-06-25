import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

/* Components */
import StockSearch from './stocks/StockSearch';

class App extends Component {
    render() {
        return(
            <Fragment>
                <h1>Bears Stock Game!</h1>
                <StockSearch />
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));