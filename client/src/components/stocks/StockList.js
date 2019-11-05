import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import PropType from 'prop-types';
import { fetchStockList, sellStock, updateStockPrice } from '../../actions/stocks';


export class StockList extends Component {
    state = {
        updatingStockPrices : false
    }

    static propTypes = {
        stocks: PropType.array.isRequired,
        fetchStockList: PropType.func.isRequired,
        sellStock: PropType.func.isRequired,
        updateStockPrice: PropType.func.isRequired,
        cashOnHand: PropType.number.isRequired
    }

    componentDidMount(){
        this.props.fetchStockList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.stocks !== prevProps.stocks) {
            // Stocks were updated
            this.setState({
                updatingStockPrices : false
            })
        } else {

        }
    }

    updateStockPrice = () => {
        this.setState({
            updatingStockPrices : true
        }, this.props.updateStockPrice)
    }

    calculatePctChange = (purchasePrice, currentPrice) => (((currentPrice - purchasePrice) / purchasePrice)*100).toFixed(2);

    render() {
        return (
            <div className="stock-list">
                <h2>List of Stocks</h2>
                <button onClick={this.updateStockPrice}>Update Prices</button>
                <table>
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Shares</th>
                            <th>Purchase Price</th>
                            <th>Current Price</th>
                            <th>Purchased On</th>
                            <th>Last Updated</th>
                            <th>Change in Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stocks.map((stock, i) =>(
                            <tr key={i}>
                                <td>{stock.symbol.toUpperCase()}</td>
                                <td>{stock.quantity}</td>
                                <td>{(stock.purchasePrice/100).toFixed(2)}</td>
                                <td>{(stock.currentPrice/100).toFixed(2)}</td>
                                <td>{moment(stock.purchasedOn).format("MMM Do, YYYY")}</td>
                                <td>{moment(stock.updatedOn).format("MMM Do, YYYY")}</td>
                                <td>{this.calculatePctChange(stock.purchasePrice, stock.currentPrice)+"%"}</td>
                                <td><button onClick={()=>this.props.sellStock(stock._id)}>Sell</button></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
                {this.state.updatingStockPrices ? (<p>Updating Stock Prices</p>):('')}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stocks : state.stockListReducer.stocks,
    cashOnHand : state.authReducer.user.cashOnHand
})

export default connect(mapStateToProps, { fetchStockList, sellStock, updateStockPrice })(StockList);
