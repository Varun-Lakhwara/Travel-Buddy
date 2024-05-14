const Contact = require('../models/contact.model.js');

const contactForm = async( req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !url || !message) {
            return next(errorHandler(400, 'All fields are required'));
          }
        
          const newContact = new Contact({
            name,
            email,
            phone,
            message,
          });

          await newContact.save();
        res.status(200).json(newContact);

    } catch (error) {
        next(error);
    }
} 

module.exports = contactForm;