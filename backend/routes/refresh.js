const express = require('express');
const router = express.Router();

const refresh = require('../controllers/refreshController');

router.get('/', refresh.handleRefreshToken);

module.exports = router;