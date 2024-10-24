const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    timestamp: { type: Date, required: true },
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number
});

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
