import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPrice } from '../../actions/stocks';
import PropType from 'prop-types';

export class StockSearch extends Component {
    state = {
        name: ''
    }

    static propTypes = {
        fetchPrice: PropType.func.isRequired
    }

    onChange = (e) => this.setState({ [e.target.name]:e.target.value });

    searchStock = (e) => {
        e.preventDefault();
        this.props.fetchPrice(this.state.name);
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
                <p>
                    { symbol && lastSalePrice ? (`Stock: ${symbol} Price: ${lastSalePrice}`):('No Stock Selected')}
                </p>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    symbol: state.stocksReducer.symbol,
    lastSalePrice: state.stocksReducer.lastSalePrice
});

export default connect(mapStateToProps, { fetchPrice })(StockSearch);