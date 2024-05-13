const express = require('express');
const verifyToken = require('../utils/error.js');
const createComment = require('../controllers/comment.controller.js');
const getPostComments = require('../controllers/comment.controller.js');

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);

module.exports = router;