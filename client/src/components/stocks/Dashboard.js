import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import StockSearch from './StockSearch';
import StockList from './StockList';
import PropType from 'prop-types';



class Dashboard extends Component {
    static propTypes = {
        cashOnHand: PropType.number.isRequired,
        stocks: PropType.array.isRequired
    }
    render() {
        const cashOnHand = parseFloat(this.props.cashOnHand);
        let portfolioWorth = parseFloat(this.props.stocks.reduce((acc, stock) => acc += parseFloat(parseFloat(stock.currentPrice).toFixed(2)) * stock.quantity, 0));
        return (
            <Fragment>
                <h1>Bears Stock Game!</h1>
                <p>Cash On Hand: ${cashOnHand.toFixed(2)}</p>
                <p>Portfolio Worth: ${(portfolioWorth + cashOnHand).toFixed(2)}</p>
                <StockSearch />
                <StockList />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cashOnHand : state.authReducer.user.cashOnHand,
    stocks: state.stockListReducer.stocks
});

export default connect(mapStateToProps)(Dashboard);