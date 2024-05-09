const express = require('express');
const verifyToken = require('../utils/error.js');
const createjournal = require('../controllers/post.controller.js');
const getposts = require('../controllers/post.controller.js');
const deletepost = require('../controllers/post.controller.js');
const editpost = require('../controllers/post.controller.js');

const router = express.Router();

router.post('/createjournal', verifyToken, createjournal);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, editpost)

module.exports = router;


