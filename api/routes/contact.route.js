const express = require('express');
const contactForm = require('../controllers/contact.controller.js');

const router = express.Router();

router.post('/contactForm', contactForm);

module.exports = router;