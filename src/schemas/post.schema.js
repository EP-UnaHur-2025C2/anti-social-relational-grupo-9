const Joi = require('joi');
const {urlImagesSchema} = require('./post_image.schema');
const {tagsSchema} = require('./tag.schema');
const {fechaSchema, idSchema, stringRequiredNoEmpty} = require('./generic.schema');

const postLength = {text: 'El contenido', minLength:10, maxLength:254};
const commonPostSchema = {descripcion:stringRequiredNoEmpty(postLength), creado:fechaSchema}

const postSchema = Joi.object({
    ...commonPostSchema,
    userId:idSchema('usuario')
});

const createAssociatePostSchema = Joi.object({
    ...commonPostSchema
});

const createPostFullSchema = Joi.object({
    ...commonPostSchema,
    urls:urlImagesSchema,
    tags:tagsSchema
});

const updatePostSchema = Joi.object({
    descripcion:stringRequiredNoEmpty(postLength)
});

module.exports = {
    postSchema,
    updatePostSchema,
    createAssociatePostSchema,
    createPostFullSchema
};