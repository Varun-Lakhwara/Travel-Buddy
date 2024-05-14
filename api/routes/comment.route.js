const express = require('express');
const verifyToken = require('../utils/error.js');
const createComment = require('../controllers/comment.controller.js');
const getPostComments = require('../controllers/comment.controller.js');
const likeComment = require('../controllers/comment.controller.js');
const editComment = require('../controllers/comment.controller.js');
const deleteComment = require('../controllers/comment.controller.js');
const getComment = require('../controllers/comment.controller.js');

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getComments', verifyToken, getComment);

module.exports = router;