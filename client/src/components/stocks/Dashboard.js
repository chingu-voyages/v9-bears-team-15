import React, { Fragment } from 'react';

import StockSearch from './StockSearch';
import StockList from './StockList'

export default function Dashboard() {
    return (
        <Fragment>
            <StockSearch />
            <StockList />
        </Fragment>
    )
}