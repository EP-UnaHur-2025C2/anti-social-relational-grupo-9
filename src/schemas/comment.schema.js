const Joi = require('joi');
const {fechaSchema, idSchema, stringRequiredNoEmpty} = require('./base.schema');

const commentLength = {text: 'El contenido', minLength:2, maxLength:8000};

const postCommentSchema = Joi.object({
    contenido:stringRequiredNoEmpty(commentLength),
    creado:fechaSchema,
    userId:idSchema('usuario'),
});

const commentSchema = Joi.object({
    contenido:stringRequiredNoEmpty(commentLength),
    creado:fechaSchema,
    userId:idSchema('usuario'),
    postId:idSchema('post')
});

const updateCommentSchema = Joi.object({
    contenido:stringRequiredNoEmpty(commentLength)
});

module.exports = {commentSchema, postCommentSchema, updateCommentSchema};