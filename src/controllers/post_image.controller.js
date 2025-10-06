const {Post_Image} = require('../db/models');

const getImages = async (req, res) => {
    const images = await Post_Image.findAll({});
    res.status(200).json(images);
};

const getImageById = async (req, res) => {
    const id = req.params.id;
    const image = await Post_Image.findByPk(id);
    res.status(200).json(image);
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
    createImage,
    updateImage,
    deleteImage
};