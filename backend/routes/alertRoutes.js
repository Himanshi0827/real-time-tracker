const express = require('express');
const { addAlert } = require('../controllers/alertController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:symbol', authenticateToken, addAlert);

module.exports = router;
