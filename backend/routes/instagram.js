const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');

router.get('/download', instagramController.downloadVideo);

module.exports = router;
