import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { fetchStockList } from '../../actions/stocks';
import StockSearch from './StockSearch';

import PropType from 'prop-types';
import './dashboard.scss';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    static propTypes = {
        cashOnHand: PropType.number.isRequired,
        stocks: PropType.array.isRequired
    }

    componentDidMount(){
        this.props.fetchStockList();
    }

    render() {
        const cashOnHand = parseFloat(this.props.cashOnHand);
        let portfolioWorth = parseFloat(this.props.stocks.reduce((acc, stock) => acc += parseFloat(parseFloat(stock.currentPrice).toFixed(2)) * stock.quantity, 0));
        let totalValue = ((portfolioWorth + cashOnHand)/100).toFixed(2);
        console.log(totalValue );
        return (
            <div className="dashboard">
                <h1>${((portfolioWorth + cashOnHand)/100).toFixed(2)}</h1>
                <div className="panel-container">
                    <Link to="/portfolio">Portfolio</Link>
                    <Link to="/lookup">Symbol Look Up</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cashOnHand : state.authReducer.user.cashOnHand,
    stocks: state.stockListReducer.stocks
});

export default connect(mapStateToProps, { fetchStockList })(Dashboard);