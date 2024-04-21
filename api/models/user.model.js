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
    },
    {timestamps:true},
);
const User = mongo.model('User', userSchema);
export default User;