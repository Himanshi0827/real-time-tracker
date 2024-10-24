const User = require('../models/User');

exports.addAlert = async (req, res) => {
    const { symbol } = req.params;
    const { threshold, type } = req.body;
    const user = await User.findById(req.user.id);

    const watchlistItem = user.watchlist.find(item => item.symbol === symbol);
    if (!watchlistItem) {
        return res.status(404).json({ message: 'Symbol not found in watchlist' });
    }

    watchlistItem.alerts.push({ threshold, type });
    await user.save();
    res.json(watchlistItem);
};
