const {Post} = require('../db/models');

const getPosts = async (req, res) => {
    const foundposts = await Post.findAll({});
    res.status(200).json(foundposts);
};

const getPostById = async (req, res) => {
    const id = req.params.id;
    const foundPost = await Post.findByPk(id);
    res.status(200).json(foundPost);
};

const createPost = async (req, res) => {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const id = req.params.id;
    await Post.update({descripcion:req.body.descripcion}, {where:{id}})
    const updatedPost = await Post.findByPk(id);
    res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
    const id = req.params.id;
    const postForDelete = await Post.findByPk(id);
    const deletedPost = await postForDelete.destroy();
    res.status(200).json(deletedPost); 
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};