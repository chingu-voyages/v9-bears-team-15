import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Portfolio extends Component {
    static propTypes = {
        stocks: PropType.array.isRequired,
        cashOnHand: PropType.number.isRequired
    }

    render() {
        const cashOnHand = parseFloat(this.props.cashOnHand);
        let portfolioWorth = parseFloat(this.props.stocks.reduce((acc, stock) => acc += parseFloat(parseFloat(stock.currentPrice).toFixed(2)) * stock.quantity, 0));
        return (
            <div>
                <h2>Portfolio</h2>
                <p>Cash On Hand: ${(cashOnHand/100).toFixed(2)}</p>
                <p>Portfolio Worth: ${((portfolioWorth + cashOnHand)/100).toFixed(2)}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cashOnHand : state.authReducer.user.cashOnHand,
    stocks: state.stockListReducer.stocks
}); 
export default connect(mapStateToProps)(Portfolio);