const Joi = require('joi');
const {arrayImagesSchema} = require('./post_image.schema');
const {arrayTagsSchema} = require('./tag.schema');
const {fechaSchema, idSchema, stringSchema} = require('./generic.schema');

const validateDescripcionParams = {text:'descripcion', minLength:10, maxLength:254};
const commonPostSchema = {descripcion:stringSchema(validateDescripcionParams), creado:fechaSchema}

const postSchema = Joi.object({
    ...commonPostSchema,
    userId:idSchema('usuario')
});

const createAssociatePostSchema = Joi.object({...commonPostSchema});

const createPostFullSchema = Joi.object({
    ...commonPostSchema,
    urls:arrayImagesSchema,
    tags:arrayTagsSchema
});

const updatePostSchema = Joi.object({descripcion:stringSchema(validateDescripcionParams)});

module.exports = {
    postSchema,
    updatePostSchema,
    createAssociatePostSchema,
    createPostFullSchema
};