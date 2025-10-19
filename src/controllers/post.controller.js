const {Post, Post_Image, Comment, Tag} = require('../db/models');

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
    getFullPostsWithComments,
    getFullPostWithComments,
    createAssociateImages,
    createAssociateComment,
    createAndOrAssociateTags
};