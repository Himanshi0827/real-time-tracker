const express = require('express');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getWatchlist);
router.post('/add', authenticateToken, addToWatchlist);
router.delete('/remove/:symbol', authenticateToken, removeFromWatchlist);

module.exports = router;
