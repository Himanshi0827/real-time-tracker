const express = require('express');
const { getStockPrice, getStockHistory } = require('../controllers/stockController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:symbol/price', authenticateToken, getStockPrice);
router.get('/:symbol/history', authenticateToken, getStockHistory);

module.exports = router;
