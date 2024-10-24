const User = require('../models/User');

exports.getWatchlist = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user.watchlist);
};

exports.addToWatchlist = async (req, res) => {
    const { symbol } = req.body;
    const user = await User.findById(req.user.id);

    if (user.watchlist.some(item => item.symbol === symbol)) {
        return res.status(400).json({ message: 'Symbol already in watchlist' });
    }

    user.watchlist.push({ symbol, alerts: [] });
    await user.save();
    res.json(user.watchlist);
};

exports.removeFromWatchlist = async (req, res) => {
    const { symbol } = req.params;
    const user = await User.findById(req.user.id);

    user.watchlist = user.watchlist.filter(item => item.symbol !== symbol);
    await user.save();
    res.json(user.watchlist);
};
