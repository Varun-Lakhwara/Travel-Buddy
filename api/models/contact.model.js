const mongo = require('mongoose');

const contactSchema = new mongo.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    phone : {
        type : Number,
        required :true, 
    },
    message : {
        type : String,
        required : true,
    },
},
{timestamps:true}
)

const Contact = mongo.model('Contact',contactSchema);
module.exports = Contact;