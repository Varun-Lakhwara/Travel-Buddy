const express = require('express');
const verifyToken = require('../utils/error.js');
const createjournal = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/createjournal', verifyToken, createjournal);

module.exports = router;


