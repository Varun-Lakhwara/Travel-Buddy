const mongo = require('mongoose');

const postSchema = new mongo.Schema(
    {
        userId : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true,
        },
        title : {
            type : String,
            unique : true,
            required : true,
        },
        image : {
            type : String,
            default : "https://kinsta.com/wp-content/uploads/2017/11/how-to-start-a-travel-blog.png"
        },
        category : {
            type : String,
            default : 'uncategorized',
        },
        slug : {
            type : String,
            required : true,
            unique : true,
        },
    },
    {timestamps : true}
)

const Post = mongo.model('Post',postSchema);
module.exports = Post;