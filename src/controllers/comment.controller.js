const {Comment} = require('../db/models');

const getComments = async (req, res) => {
    const comments = await Comment.findAll({});
    res.status(200).json(comments);
};

const getCommentById = async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    res.status(200).json(comment);
};

const createComment = async (req, res) => {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment); 
};

const updateComment = async (req, res) => {
    const id = req.params.id;
    await Comment.update({contenido:req.body.contenido}, {where:{id}})
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
    createComment,
    updateComment,
    deleteComment
};