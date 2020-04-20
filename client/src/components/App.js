import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../store';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';

/* Components */
import Dashboard from './stocks/Dashboard';
import Portfolio from './stocks/Portfolio';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Header from './layout/Header';
import './app.scss';
import { StockSearch } from './stocks/StockSearch';

class App extends Component {
    render() {
        return(
            <Provider store={store}> 
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} /> 
                                <PrivateRoute exact path='/' component={Dashboard} />
                                <PrivateRoute exact path="/portfolio" component={Portfolio}/>
                                <PrivateRoute exact path="/lookup" component={StockSearch}/>
                            </Switch>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));