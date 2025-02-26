const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

router.get('/download', youtubeController.downloadVideo);

module.exports = router;
