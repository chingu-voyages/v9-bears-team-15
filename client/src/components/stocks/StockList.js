import React, { Component } from 'react'
import { connect } from 'react-redux';
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
        updateStockPrice: PropType.func.isRequired
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

    render() {
        return (
            <div>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stocks.map((stock, i) =>(
                            <tr key={i}>
                                <td>{stock.symbol}</td>
                                <td>{stock.quantity}</td>
                                <td>{stock.purchasePrice}</td>
                                <td>{stock.currentPrice}</td>
                                <td>{stock.purchasedOn}</td>
                                <td>{stock.updatedOn}</td>
                                <td><button onClick={()=>this.props.sellStock(stock._id)}>Sell Shares</button></td>
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
    stocks : state.stockListReducer.stocks
})

export default connect(mapStateToProps, { fetchStockList, sellStock, updateStockPrice })(StockList);
