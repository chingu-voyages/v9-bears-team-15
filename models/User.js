const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cashOnHand: {
        type: Number,
        default: 1000000
    }
});

module.exports = User = mongoose.model('user', UserSchema);