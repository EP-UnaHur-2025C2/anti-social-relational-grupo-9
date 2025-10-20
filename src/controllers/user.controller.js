const {User, Post, Post_Image, Tag} = require('../db/models');
const {tagService} = require('../service-functions');

const getUserWithPosts = async (req, res) => {
    const id = req.params.id;
    const userWithPosts = await User.findOne({where: {id}, include:[{model:Post, as:'posts', include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}]}]});
    res.status(200).json(userWithPosts);
};

const getUserImages = async (req, res) => { //pasar esta funcion a post_images controller
    const id = req.params.id;
    const {nickName, fechaNacimiento, email, posts} = await User.findOne({where: {id}, include:[{model:Post, as:'posts', attributes:['id'], include:[{model:Post_Image, as:'images', attributes:['url']}]}]});
    const images = posts.flatMap(pI => pI.images); //devuelve un array de objetos con la propiedad url
    const userImages = {id, nickName, fechaNacimiento, email, images}
    res.status(200).json(userImages);
};

const createAssociatePost = async (req, res) => {
    const id = req.params.id;
    const newPost = await Post.create({...req.body, userId:id});
    res.status(201).json(newPost);
};

const createPostFull = async (req, res) => { //borrar esta funcion solo usarla para crear mas facil posts
    const id = req.params.id;
    const {descripcion, creado, urls, tags} = req.body;
    const newPost = await Post.create({descripcion, creado, userId:id});
    for(let url of urls) await newPost.createImage({url});//createImage viene del as:images de la asociacion
    const newTags = await tagService.createOrAssociateTags(newPost, tags)
    const newPostFull = await Post.findOne({where: {id:newPost.id}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}]});
    res.status(201).json(newPostFull);
};

module.exports = {
    getUserWithPosts,
    getUserImages,
    createAssociatePost,
    createPostFull,
};