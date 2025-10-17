const Joi = require('joi');
const {fechaSchema, idSchema, stringSchema} = require('./generic.schema');

const contenidoSchema = stringSchema({text:'contenido', minLength:2, maxLength:8000});
const commonSchemas = {
    contenido:contenidoSchema,
    creado:fechaSchema,
    userId:idSchema('usuario')
};

const postCommentSchema = Joi.object({...commonSchemas}).unknown(false);

const commentSchema = Joi.object({
    ...commonSchemas,
    postId:idSchema('post')
});

const updateCommentSchema = Joi.object({contenido:contenidoSchema}).unknown(false);

module.exports = {
    commentSchema,
    postCommentSchema,
    updateCommentSchema
};