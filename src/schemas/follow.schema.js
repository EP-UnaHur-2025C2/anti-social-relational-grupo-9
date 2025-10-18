const Joi = require('joi');
const {idSchema} = require('./generic.schema');

const followedIdSchema = idSchema('user');

const followIdSchema = Joi.object({followedId:followedIdSchema});

const updateFollowIdSchema = Joi.object({
    followedId:followedIdSchema,
    newFollowedId: idSchema('user')
});

module.exports = {followIdSchema, updateFollowIdSchema};