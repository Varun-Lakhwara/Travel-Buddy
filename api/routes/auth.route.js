const express = require ('express');
const signup = require('../controllers/auth.controller.js');
const signin = require('../controllers/auth.controller.js');
const router = express.Router();


router.post('/Signup',signup);
router.post('/Signin',signin);

module.exports = router;