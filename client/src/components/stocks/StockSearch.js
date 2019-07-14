import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPrice, purchaseStock, purchaseExistingStock } from '../../actions/stocks';
import PropType from 'prop-types';

export class StockSearch extends Component {
    state = {
        name: '',
        minRange: 1,
        maxRange: 50,
        amount: 1
    }

    static propTypes = {
        fetchPrice: PropType.func.isRequired,
        purchaseStock: PropType.func.isRequired,
        purchaseExistingStock: PropType.func.isRequired,
        stocks: PropType.array
    }

    onChange = (e) => this.setState({ [e.target.name]:e.target.value });


    searchStock = (e) => {
        e.preventDefault();
        this.props.fetchPrice(this.state.name);
        this.setState({amount:1})
    }

    purchaseShares = () => {
        const stock = this.props.stocks.find(stock => stock.symbol === this.props.symbol);
        if (!stock)
        {
            const { symbol, lastSalePrice } = this.props;
            this.props.purchaseStock({
                symbol,
                purchasePrice:lastSalePrice,
                quantity:this.state.amount
            })
        } else {
            const newAmount = parseInt(stock.quantity)+parseInt(this.state.amount);
            this.props.purchaseExistingStock(stock._id, newAmount);
        }
    }
    
    render() {
        const { symbol, lastSalePrice } = this.props;
        const { name } = this.state;
        return (
            <Fragment>
                <form onSubmit={this.searchStock}>
                    <label htmlFor="name">Enter Stock Symbol:</label>
                    <input type="text" name="name" onChange={this.onChange} value={name} />
                    <p>Examples include AAPL(Apple), ATVI(Activision), etc</p>
                </form>
                { symbol && lastSalePrice ? (
                    <Fragment>
                        <p>{`Stock: ${symbol} Price: ${lastSalePrice}`}</p>
                        <label htmlFor='amount'>Quanity of Shares:{this.state.amount}</label>
                        <input 
                            type='range' 
                            name='amount' 
                            min={this.state.minRange}
                            max={this.state.maxRange}
                            value={this.state.amount}
                            steps='1'
                            onChange={this.onChange}
                        />
                        <button onClick={this.purchaseShares}>Purchase</button>
                    </Fragment>):
                    (<p>No Stock Selected</p>)}
              
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    symbol: state.stocksReducer.symbol,
    lastSalePrice: state.stocksReducer.lastSalePrice,
    stocks : state.stockListReducer.stocks
});

export default connect(mapStateToProps, { fetchPrice, purchaseStock, purchaseExistingStock })(StockSearch);