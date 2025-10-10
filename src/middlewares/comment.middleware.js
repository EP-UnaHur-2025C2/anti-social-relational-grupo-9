const {Comment} = require('../db/models');

const idsExistByModel = (modelPost, modelUser) => {
    return  async (req, res, next) => {
        console.log('print el req:', req.params)
        const {postId, userId} = req.params;
        const idPostFound = await modelPost.findByPk(postId);
        const idUserFound = await modelUser.findByPk(userId);
        if(!idPostFound || !idUserFound)
            return res.status(404).json(
                `${!idUserFound && !idPostFound ?
                    `commentMid idsExistByModel - Not Found: El id de post ${postId} y de user ${userId} no se encuentran registrados`:
                    `commentMid idsExistByModel - Not Found: El id de ${idPostFound ? 'user '+userId:'post '+postId} no se encuentra registrado`}`)
        next();
    };
};

const postCommentedByUser =  async (req, res, next) => {
    const {postId, userId} = req.params;
    const comments = await Comment.findAll({where:{postId, userId}});
    if(comments.length == 0)
        return res.status(400).json(`commentMid postBelongsToUser - El post ${postId} no fue comentado por el usuario ${userId}.`);
    next();
};

const creadoValidation =  async (req, res, next) => {
    const creado = new Date(req.body.creado);
    const hoy = new Date()
    if(creado > hoy)
        return res.status(400).json(`commentMid creadoValidation - La fecha de creacion ${creado} no puede ser posterior a la fecha actual ${hoy}.`);
    next();
};

module.exports = {creadoValidation, idsExistByModel, postCommentedByUser};
