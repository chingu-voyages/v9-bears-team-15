const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const StockSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    purchasePrice : {
        type: Number,
        required: true
    },
    currentPrice : {
        type: Number
    },
    purchasedOn : {
        type: Date,
        default: Date.now
    },
    updatedOn : {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
    
});

module.exports = Stock = mongoose.model('stock', StockSchema);