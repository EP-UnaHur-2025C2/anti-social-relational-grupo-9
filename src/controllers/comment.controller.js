const {Comment, Post} = require('../db/models');

const getVisibleComments = async (req, res) => {
    const comments = await Comment.findAll({});
    const visibleComments = comments.filter(c => c.visible);
    res.status(200).json(visibleComments);
};

const getVisibleCommentsByPost = async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.findAll({where:{postId:id}, include:{model:Post, as:'post'}});
    const visibleComments = comments.filter(c => c.visible);
    res.status(200).json(visibleComments);
};

const getUserComments = async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.findAll({where:{userId:id}});
    res.status(200).json(comments);
};

const getCommentsOnPostByUser = async (req, res) => {
    const {postId, userId} = req.params;
    const comments = await Comment.findAll({where:{postId, userId}});
    res.status(200).json(comments);
};

module.exports = {
    getVisibleComments,
    getVisibleCommentsByPost,
    getCommentsOnPostByUser,
    getUserComments,
};