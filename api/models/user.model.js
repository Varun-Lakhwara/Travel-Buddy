let mongo = require ('mongoose');

const userSchema = new mongo.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true, 
    },
    profilePicture : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    },
    {timestamps:true},
);
const User = mongo.model('User', userSchema);
module.exports = User;