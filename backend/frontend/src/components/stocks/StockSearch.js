import React, { Component } from 'react';

export default class StockSearch extends Component {
    state = {
        name: ''
    }

    onChange(e) {
        console.log(e.target.name, e.target.value);
        //this.setState({ [e.target.name]:e.target.value })
    }

    render() {
        return (
            <form>
                <label htmlFor="name">Enter Stock:</label>
                <input text name="name" onChange={this.onChange} value={this.state.name} />
            </form>
        )
    }
}