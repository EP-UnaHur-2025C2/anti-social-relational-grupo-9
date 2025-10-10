const {Comment, Post} = require('../db/models');

const getComments = async (req, res) => {
    const comments = await Comment.findAll({});
    res.status(200).json(comments);
};

const getCommentById = async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    res.status(200).json(comment);
};

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

const createComment = async (req, res) => {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment); 
};

const updateComment = async (req, res) => {
    const id = req.params.id;
    const {contenido} = req.body;
    await Comment.update({contenido}, {where:{id}})
    const updatedComment = await Comment.findByPk(id);
    res.status(200).json(updatedComment);
};

const deleteComment = async (req, res) => {
    const id = req.params.id;
    const commentForDelete = await Comment.findByPk(id);
    const deletedComment = await commentForDelete.destroy();
    res.status(200).json(deletedComment)
};

module.exports = {
    getComments,
    getCommentById,
    getVisibleComments,
    getVisibleCommentsByPost,
    getCommentsOnPostByUser,
    getUserComments,
    createComment,
    updateComment,
    deleteComment
};