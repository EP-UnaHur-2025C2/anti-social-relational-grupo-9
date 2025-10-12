const {User, Post, Post_Image, Tag} = require('../db/models');

const getUsers = async (req, res) => {
    const users = await User.findAll({});
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.status(200).json(user);
};

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

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    await User.update(req.body, {where:{id}})
    const userUpdated = await User.findByPk(id);
    res.status(201).json(userUpdated);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const userDeleted = await user.destroy();
    res.status(200).json(userDeleted);
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
    for(let tag of tags) {
        let tagFound = await Tag.findOne({where:{nombre:tag}}); 
        if(!tagFound)
            await newPost.createTag({nombre:tag});
        else
            await newPost.addTag(tagFound);
    }
    const newPostFull = await Post.findOne({where: {id:newPost.id}, include:[{model:Post_Image, as:'images'}, {model:Tag, as:'tags', through:{attributes:[]}}]});
    res.status(201).json(newPostFull);
}

module.exports = {
    getUsers,
    getUserById,
    getUserWithPosts,
    getUserImages,
    updateUser,
    createUser,
    deleteUser,
    createAssociatePost,
    createPostFull
};