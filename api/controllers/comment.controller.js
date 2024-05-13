const errorHandler = require("../utils/error.js");
const Comment = require('../models/comment.model.js');

const createComment = async(req,res,next) => {
    try {
        const{ content, postId, userId } = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to create this comment'));
        }

        const newComment = new Commnet({
            content,
            postId,
            userId,
        });
        await newComment.save();
        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
};

const getPostComments = async(req, res, next) =>{
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort(
            {
                createdAt: -1,
            });
            res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

const likeComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Comment not found'));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        }
        else{
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);

    } catch (error) {
        next(error);
    }
};

const editComment = async(req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Comment not found'));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, 'You are not authorized to edit this comment'));
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId,{
            constent : req.body.content,
        },
        {
            new : true,
        });
        res.status(200).json(editedComment);
    } catch (error) {
        next(error);
    }
}

module.exports = createComment;
module.exports = getPostComments;
module.exports = likeComment;
module.exports = editComment;