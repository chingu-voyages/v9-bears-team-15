import React, { Component, Fragment } from 'react';

export default class StockSearch extends Component {
    state = {
        name: '',
        stock: ''
    }

    onChange = (e) => this.setState({ [e.target.name]:e.target.value });

    searchStock = (e) => {
        e.preventDefault();
    }
    
    render() {
        const { name, stock } = this.state;
        return (
            <Fragment>
                <form onSubmit={searchStock}>
                    <label htmlFor="name">Enter Stock:</label>
                    <input type="text" name="name" onChange={this.onChange} value={name} />
                </form>
                <p>
                    { stock ? (`Stock: ${stock}`):('No Stock Selected')}
                </p>
            </Fragment>
        )
    }
}