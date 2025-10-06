const {Tag, Post, Post_Image, User} = require('../db/models');

const getTags = async (req, res) => {
    const tags = await Tag.findAll({});
    res.status(200).json(tags);
};

const getTagById = async (req, res) => {
    const id = req.params.id;
    const tag = await Tag.findByPk(id);
    res.status(200).json(tag);
};

const getPostsByTag = async (req, res) => {
    const id = req.params.id;
    const taggedPosts = await Tag.findOne({
        where:{id},
        include:{
            model:Post,
            as:'posts',
            through:{attributes:[]}
        }
    });
    res.status(200).json(taggedPosts);
};

const getImagesByTag = async (req, res) => {
    const {id, nombre, posts} = await Tag.findOne({
        where:{id:req.params.id},
        include:[{
            model:Post,
            as:'posts',
            attributes:['id'],
            through:{attributes:[]},
            include:[{
                model:Post_Image,
                as:'images',
                attributes:['id', 'url']
            }]
        }]
    });
    const images = posts.flatMap(post => post.images);
    const taggedImages = {id, nombre, images};
    res.status(200).json(taggedImages);
};

const getUsersByTag = async (req, res) => {
    const {id, nombre, posts} = await Tag.findOne({
        where:{id:req.params.id},
        include:[{
            model:Post,
            as:'posts',
            attributes:['id'],
            through:{attributes:[]},
            include:[{
                model:User,
                as:'user'
            }]
        }]
    });
    const usersList = posts.map(p => p.user);
    const users = usersList.reduce((uniqueUsers, user) => {return !uniqueUsers.find(u => u.id == user.id) ? uniqueUsers.concat(user):uniqueUsers}, []);
    const taggedUsers = {id, nombre, users};
    res.status(200).json(taggedUsers);
};

const createTag = async (req, res) => {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag); 
};

const updateTag = async (req, res) => {
    const id = req.params.id;
    await Tag.update({nombre:req.body.nombre}, {where:{id}});
    const updatedTag = await Tag.findByPk(id);
    res.status(200).json(updatedTag);
};

const deleteTag = async (req, res) => {
    const id = req.params.id;
    const tagForDelete = await Tag.findByPk(id);
    const deletedTag = await tagForDelete.destroy();
    res.status(200).json(deletedTag);
};

module.exports = {
    getTags,
    getTagById,
    getPostsByTag,
    getImagesByTag,
    getUsersByTag,
    createTag,
    updateTag,
    deleteTag,
};