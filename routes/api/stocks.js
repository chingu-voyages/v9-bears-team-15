const express = require('express');
const router = express.Router();
const axios = require('axios');
//const stock_key = require('../../config/keys').stock_key;
const { ObjectID } = require('mongodb');
const auth = require('../../middleware/auth');

// Stock Model
const Stock = require('../../models/Stock');
const User = require('../../models/User');

// @route           GET api/stocks
// @description     Get all stocks for a user
// @access          Private
router.get('/', auth, (req, res) => {
    Stock.find({
        creator:req.user.id
    })
        .sort('symbol')
        .then(stocks => res.json(stocks))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})

// @route           GET api/stocks/fetch_stock?symbol={symbol}
// @description     Get all stocks for a user
// @access          Private

async function _stockLookup(symbol) {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${symbol}`);
    return response.data;
}

// TODO - Refactor to use _stockLookup Function
router.get('/fetch_stock/:symbol', auth, async (req, res) => {
    url = `https://financialmodelingprep.com/api/v3/stock/real-time-price/${req.params.symbol}`
    axios.get(url)
        .then(results => res.json(results.data))
        .catch(err => res.status(400).json({"error":"Invalid call"}));
})



//TODO - Refactor this so it's all one call
// @route           GET api/stocks/update_stocks
// @description     Update All Currently Owned Stocks
// @access          Private
router.get('/update_stocks',auth, async (req, res) => {
    //FOLLOW Node-todo-api Patch example 
    const stocks = await Stock.find({
        creator:req.user.id
    });
    let updatedStocks;
    try {
        updatedStocks = await Promise.all(stocks.map(stock => _stockLookup(stock.symbol)));
    } catch (err) {
        res.status(400).json({"error":err});
    }
    const updatedPrices = await updatedStocks.reduce((acc, data) => {
        if (data) {
            const symbol = data.symbol;
            return {
                ...acc,
                [symbol]:{
                    price:data.price
                }
            }
        } else {
            res.status(400).json({msg:"Symbol Lookup Quota Exceeded"});
        }
    }, {});
    try {
        const arr = await Promise.all(stocks.map(async stock => await _updateEachStock(stock, updatedPrices[stock.symbol].price)));
        res.json(arr);
    } catch (err) {
        console.log(err);
        res.status(400).json({"error":err});
    } 
});
 

function _updateEachStock(stock, price) {
    return Stock.findOneAndUpdate({
        _id:stock._id
    },{$set:{ currentPrice : parseInt(price*100), updatedOn:Date.now() } }, { new:true })
}

    

// @route               POST api/stocks
// @description         Add a Stock Purchase
// @access              Private
router.post('/',auth, async (req, res) => {
    const { quantity, purchasePrice } = req.body;
    const stockInfo = {
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        currentPrice: req.body.purchasePrice,
        quantity: req.body.quantity || 1,
        creator: req.user.id
    }
    try {
        const user = await User.findOne({_id: req.user.id});
        if ((quantity * parseFloat(purchasePrice).toFixed(2)) > user.cashOnHand) {
            return res.status(400).send({msg:'insufficient funds'});
        }
        user.cashOnHand = user.cashOnHand - (quantity * parseFloat(purchasePrice).toFixed(2));
        const newStock = await new Stock(stockInfo);
        await user.save()
        await newStock.save()
        return res.json({user, stock:newStock});
      
    } catch(err) {
        console.log(err);
        return res.status(400).json({msg:err});
    }
})

// @route               POST api/stocks/:id
// @description         Purchase more shares of a currently owned stock
// @access              Private
router.patch('/:id', auth, async (req, res)=> {
    const id = req.params.id;
    const { quantity, totalQuantity, currentPrice } = req.body;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    try {
        const stock = await Stock.findOneAndUpdate({_id:id}, {$set: { quantity: totalQuantity, currentPrice } }, {new: true});
        if (!stock) {
            return res.status(404).send();
        }
        const user = await User.findOne({_id: req.user.id});
        if ((quantity * parseFloat(currentPrice).toFixed(2)) > user.cashOnHand) {
            return res.status(400).send({msg:'insufficient funds'});
        }
        user.cashOnHand = user.cashOnHand - (quantity * parseFloat(currentPrice).toFixed(2));
        await user.save();
        res.send({stock, user});

    } catch(err) {
        res.status(400).json({"error":"Invalid data provided"});
    }
})


// @route               DELETE api/stocks
// @description         Delete a Stock 
// @access              Private
router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    try {
        const user = await User.findOne({_id:req.user.id});
        const stock = await Stock.findByIdAndDelete(id);
        console.log(user.cashOnHand, stock.quantity, stock.currentPrice);
        user.cashOnHand = parseFloat(user.cashOnHand + (stock.quantity *stock.currentPrice)).toFixed(2);
        await user.save();
        return res.json({ user })
    } catch(err) {
        res.status(400).json({"error":"Invalid data provided"});
    }       
});


module.exports = router;