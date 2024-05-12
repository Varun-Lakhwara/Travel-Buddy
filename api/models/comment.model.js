const mongo = require('mongoose');

const commentSchema = new mongo.Schema(
    {
        content:{
            type:String,
            required:true
        },
        postId:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        },
        likes:{
            type:Array,
            default:[],
        },
        numberOfLikes:{
            type:Number,
            default:0,
        },
    },
    {timestamps:true}
)

const Comment = mongo.model('Comment', commentSchema);
module.exports = Comment;



