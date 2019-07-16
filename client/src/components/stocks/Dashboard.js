import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import StockSearch from './StockSearch';
import StockList from './StockList';
import PropType from 'prop-types';

class Dashboard extends Component {
    static propTypes = {
        cashOnHand: PropType.number.isRequired
    }
    render() {
        return (
            <Fragment>
                <h1>Bears Stock Game!</h1>
                <p>Cash On Hand: ${parseFloat(this.props.cashOnHand).toFixed(2)}</p>
                <StockSearch />
                <StockList />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cashOnHand : state.authReducer.user.cashOnHand
});

export default connect(mapStateToProps)(Dashboard);