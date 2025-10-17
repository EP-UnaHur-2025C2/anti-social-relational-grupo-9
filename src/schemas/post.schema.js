const Joi = require('joi');
const {arrayImagesSchema} = require('./post_image.schema');
const {arrayTagsSchema} = require('./tag.schema');
const {fechaSchema, idSchema, stringSchema} = require('./generic.schema');

const descripcionSchema = stringSchema({text:'descripcion', minLength:10, maxLength:254});
const commonSchemas = {
    descripcion:descripcionSchema,
    creado:fechaSchema
};

const postSchema = Joi.object({
    ...commonSchemas,
    userId:idSchema('usuario')
});

const createAssociatePostSchema = Joi.object({...commonSchemas}).unknown(false);

const createPostFullSchema = Joi.object({
    ...commonSchemas,
    urls:arrayImagesSchema,
    tags:arrayTagsSchema
}).unknown(false);

const updatePostSchema = Joi.object({descripcion:descripcionSchema}).unknown(false);

module.exports = {
    postSchema,
    updatePostSchema,
    createAssociatePostSchema,
    createPostFullSchema
};