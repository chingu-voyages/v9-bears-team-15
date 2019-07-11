import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';

/* Components */
import Dashboard from './stocks/Dashboard';
// import StockSearch from './stocks/StockSearch';
// import StockList from './stocks/StockList';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Header from './layout/Header';

class App extends Component {
    render() {
        return(
            <Provider store={store}> 
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <h1>Bears Stock Game!</h1>
                            <Switch>
                                <PrivateRoute exact path='/' component={Dashboard} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} /> 
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));