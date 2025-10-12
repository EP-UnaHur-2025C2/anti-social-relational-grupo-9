const {Post_Image, Post, Tag} = require('../db/models');

const getImageTags = async (req, res) => {
    const {id, url, post} = await Post_Image.findOne({where:{id:req.params.id}, include:[{model:Post, as:'post', attributes:['id'], include:[{model:Tag, as:'tags', through:{attributes:[]}}]}]});
    const imageTags = {id, url, tags:post.tags};
    res.status(200).json(imageTags);
};

module.exports = {getImageTags};