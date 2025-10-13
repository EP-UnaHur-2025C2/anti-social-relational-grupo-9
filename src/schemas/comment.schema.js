const Joi = require('joi');
const {fechaSchema, idSchema, stringSchema} = require('./generic.schema');

const validateCommentParams = {text:'contenido', minLength:2, maxLength:8000};
const commonCommentSchema = {contenido:stringSchema(validateCommentParams), creado:fechaSchema, userId:idSchema('usuario')};

const postCommentSchema = Joi.object({...commonCommentSchema});

const commentSchema = Joi.object({
    ...commonCommentSchema,
    postId:idSchema('post')
});

const updateCommentSchema = Joi.object({contenido:stringSchema(validateCommentParams)});

module.exports = {
    commentSchema,
    postCommentSchema,
    updateCommentSchema
};