const {Follow} = require('../db/models')

const followValidation = (idModel) => {
    return async (req, res, next) => {
        const followerId = req.params.id;
        const followedId = req.body[idModel];
        const existingFollow = await Follow.findOne({where:{followerId, followedId}});
        if(!existingFollow)
            return res.status(409).json(`followMid followValidation - El usuario ${followerId} no sigue al usuario ${followedId}`);
        next();
    };
};

const notFollowValidation = (idModel) => {
    return async (req, res, next) => {
        const followerId = req.params.id;
        const followedId = req.body[idModel];
        const existingFollow = await Follow.findOne({where:{followerId, followedId}});
        if(existingFollow)
            return res.status(409).json(`followMid notFollowValidation - El usuario ${followerId} ya sigue al usuario ${followedId}`);
        next();
    };
};

const autoFollowValidation = (idModel) => {
    return async (req, res, next) => {
        const followerId = req.params.id;
        const followedId = req.body[idModel];
        if(followerId == followedId)
            return res.status(409).json(`followMid autoFollowValidation - El id de follower no puede ser igual al de followed`);
        next();
    };
};

module.exports = {followValidation, notFollowValidation, autoFollowValidation};