const {Post_Image, Post, Tag} = require('../db/models');

const getImages = async (req, res) => {
    const images = await Post_Image.findAll({});
    res.status(200).json(images);
};

const getImageById = async (req, res) => {
    const id = req.params.id;
    const image = await Post_Image.findByPk(id);
    res.status(200).json(image);
};

const getImageTags = async (req, res) => {
    const {id, url, post} = await Post_Image.findOne({where:{id:req.params.id}, include:[{model:Post, as:'post', attributes:['id'], include:[{model:Tag, as:'tags', through:{attributes:[]}}]}]});
    const imageTags = {id, url, tags:post.tags};
    res.status(200).json(imageTags);
};

const createImage = async (req, res) => {
    const newImage = await Post_Image.create(req.body);
    res.status(201).json(newImage); 
};

const updateImage = async (req, res) => {
    const id = req.params.id;
    const {url} = req.body;
    await Post_Image.update({url}, {where:{id}})
    const imageUpdated = await Post_Image.findByPk(id);
    res.status(200).json(imageUpdated);
};

const deleteImage = async (req, res) => {
    const id = req.params.id;
    const imageForDelete = await Post_Image.findByPk(id);
    const deletedImage = await imageForDelete.destroy();
    res.status(200).json(deletedImage)
};

module.exports = {
    getImages,
    getImageById,
    getImageTags,
    createImage,
    updateImage,
    deleteImage
};