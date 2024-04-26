const express = require('express');
const verifyToken = require('../utils/error.js');
const create = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/createjournal', verifyToken, create);

module.exports = router;


