const express = require('express');
const router = express.Router();
const tiktokController = require('../controllers/tiktokController');

router.get('/download', tiktokController.downloadVideo);

module.exports = router;
