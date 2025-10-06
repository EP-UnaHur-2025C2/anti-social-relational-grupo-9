const {Tag} = require('../db/models');

const getTags = async (req, res) => {
    const tags = await Tag.findAll({});
    res.status(200).json(tags);
};

const getTagById = async (req, res) => {
    const id = req.params.id;
    const tag = await Tag.findByPk(id);
    res.status(200).json(tag);
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
    createTag,
    updateTag,
    deleteTag,
};