const {Post_Image} = require('../db/models');

const urlsValidation = async (req, res, next) => {
    const {urlImages} = req.body;
    const urls = await Post_Image.findAll({});
    const urlsFound = urls.filter(u => urlImages.includes(u.url));
    if(urlsFound.length > 0) {
        return res.status(400).json(`imageMid urlValidation - La/s url/s ${urlsFound.map(u => u.url)} ya se encuentra/n registrada/s.`)
    };
    next();
};

const urlValidation = async (req, res, next) => {
    const {url} = req.body;
    const urlFound = await Post_Image.findOne({where:{url}});
    if(urlFound) {
        return res.status(400).json(`imageMid urlValidation - La url ${urlFound.url} ya se encuentra registrada.`)
    };
    next();
};

module.exports = {urlsValidation, urlValidation};