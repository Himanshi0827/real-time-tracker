const axios = require('axios');
const PriceHistory = require('../models/PriceHistory');

exports.getStockPrice = async (req, res) => {
    const { symbol } = req.params;
    const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    if (response.data['Global Quote']) {
        res.json(response.data['Global Quote']);
    } else {
        res.status(404).json({ message: 'Stock data not found' });
    }
};

exports.getStockHistory = async (req, res) => {
    const { symbol } = req.params;
    const { interval } = req.query; 

    let timeSeriesFunction;
    switch (interval) {
        case 'weekly':
            timeSeriesFunction = 'TIME_SERIES_WEEKLY';
            break;
        case 'monthly':
            timeSeriesFunction = 'TIME_SERIES_MONTHLY';
            break;
        default:
            timeSeriesFunction = 'TIME_SERIES_DAILY';
    }

    const response = await axios.get(
        `https://www.alphavantage.co/query?function=${timeSeriesFunction}&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    const timeSeriesData = response.data[`Time Series (${interval.charAt(0).toUpperCase() + interval.slice(1)})`];
    if (timeSeriesData) {
        const historicalData = Object.entries(timeSeriesData).map(([date, data]) => ({
            symbol,
            timestamp: new Date(date),
            open: parseFloat(data['1. open']),
            high: parseFloat(data['2. high']),
            low: parseFloat(data['3. low']),
            close: parseFloat(data['4. close']),
            volume: parseInt(data['5. volume'])
        }));

        await PriceHistory.insertMany(historicalData);
        res.json(historicalData);
    } else {
        res.status(404).json({ message: 'Historical data not found' });
    }
};
