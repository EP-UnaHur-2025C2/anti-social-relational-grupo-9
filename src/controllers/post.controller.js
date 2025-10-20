const {Post, Post_Image, Comment, Tag} = require('../db/models');
const {tagService} = require('../service-functions');

const getFullPostsWithComments = async (req, res) => {
    const foundPosts = await Post.findAll({where:{}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}, {model:Comment, as:'comments'}]});
    res.status(200).json(foundPosts);
}

const getFullPostWithComments = async (req, res) => {
    const id = req.params.id;
    const foundPost = await Post.findOne({where:{id}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}, {model:Comment, as:'comments'}]});
    res.status(200).json(foundPost);
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
    const existingPost = await Post.findByPk(id);
    const newTags = await tagService.createOrAssociateTags(existingPost, tags);
    res.status(201).json(newTags);
};

module.exports = {
    getFullPostsWithComments,
    getFullPostWithComments,
    createAssociateImages,
    createAssociateComment,
    createAndOrAssociateTags
};