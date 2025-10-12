const Joi = require('joi');
const {fechaSchema, idSchema, stringRequiredNoEmpty} = require('./generic.schema');

const commentLength = {text: 'El contenido', minLength:2, maxLength:8000};
const commonCommentSchema = {contenido:stringRequiredNoEmpty(commentLength), creado:fechaSchema, userId:idSchema('usuario')};

const postCommentSchema = Joi.object({
    ...commonCommentSchema
});

const commentSchema = Joi.object({
    ...commonCommentSchema,
    postId:idSchema('post')
});

const updateCommentSchema = Joi.object({
    contenido:stringRequiredNoEmpty(commentLength)
});

module.exports = {commentSchema, postCommentSchema, updateCommentSchema};