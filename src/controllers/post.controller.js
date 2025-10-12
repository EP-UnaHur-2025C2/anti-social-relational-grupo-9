const {Post, Post_Image, Comment, Tag} = require('../db/models');

const getPosts = async (req, res) => {//ver si incluir el los posts completo con comments
    const foundposts = await Post.findAll({});
    res.status(200).json(foundposts);
};

const getPostById = async (req, res) => {//ver si incluir los posts completos con comments
    const id = req.params.id;
    const foundPost = await Post.findByPk(id);
    res.status(200).json(foundPost);
};

const getFullPostsWithComments = async (req, res) => {
    const foundPosts = await Post.findAll({where:{}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}, {model:Comment, as:'comments'}]});
    res.status(200).json(foundPosts);
}

const getFullPostWithComments = async (req, res) => {
    const id = req.params.id;
    const foundPost = await Post.findOne({where:{id}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}, {model:Comment, as:'comments'}]});
    res.status(200).json(foundPost);
};

const createPost = async (req, res) => {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const id = req.params.id;
    const {descripcion} = req.body;
    await Post.update({descripcion}, {where:{id}}) //no toma en cuenta el userId ni la fecha de creado
    const updatedPost = await Post.findByPk(id);
    res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
    const id = req.params.id;
    const postForDelete = await Post.findByPk(id);
    const deletedPost = await postForDelete.destroy();
    res.status(200).json(deletedPost); 
};

const createAssociateImages = async (req, res) => {
    const postId = req.params.id;
    const {urls} = req.body;
    let newImages = [];
    for(let url of urls) {
        newImages.push(await Post_Image.create({url, postId}));
    }
    res.status(201).json(newImages);
};

const createAssociateComment = async (req, res) => {
    const postId = req.params.id;
    const newComment = await Comment.create({...req.body, postId});
    res.status(201).json(newComment);
};

const createAndOrAssociateTags = async (req, res) => {
    const id = req.params.id;
    const {tags} = req.body;
    const newTags = [];
    const existingPost = await Post.findOne({where:{id}});
    for(let tag of tags) {
        let existingTag = await Tag.findOne({where:{nombre:tag}});
        if(existingTag) {
            await existingPost.addTag(existingTag);
            newTags.push(existingTag);
        }
        else {
            newTags.push(await existingPost.createTag({nombre:tag}));
        }
    }
    res.status(201).json(newTags);
};

module.exports = {
    getPosts,
    getPostById,
    getFullPostsWithComments,
    getFullPostWithComments,
    createPost,
    updatePost,
    deletePost,
    createAssociateImages,
    createAssociateComment,
    createAndOrAssociateTags
};