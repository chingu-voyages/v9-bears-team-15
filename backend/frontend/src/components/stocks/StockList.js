import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { fetchStockList, sellStock } from '../../actions/stocks';


export class StockList extends Component {

    static propTypes = {
        stocks: PropType.array.isRequired,
        fetchStockList: PropType.func.isRequired,
        sellStock: PropType.func.isRequired
    }

    componentDidMount(){
        this.props.fetchStockList();
    }

    render() {
        return (
            <div>
                <h2>List of Stocks</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Current Price</th>
                            <th>Purchase Price</th>
                            <th>Purchased On</th>
                            <th>Last Updated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stocks.map((stock, i) =>(
                            <tr key={i}>
                                <td>{stock.stockSymbol}</td>
                                <td>{stock.currentPrice}</td>
                                <td>{stock.purchasePrice}</td>
                                <td>{stock.purchase_at}</td>
                                <td>{stock.updated_at}</td>
                                <td><button onClick={()=>this.props.sellStock(stock.id)}>Sell Shares</button></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    stocks : state.stockListReducer.stocks
})

export default connect(mapStateToProps, { fetchStockList, sellStock })(StockList);
