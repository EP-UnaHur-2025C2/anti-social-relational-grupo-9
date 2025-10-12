const Joi = require('joi');
const {idSchema, stringRequiredNoEmpty, arraySchema} = require('./generic.schema');

const tagLength = {text: 'El contenido', minLength:2, maxLength:8000};

const tagsSchema = arraySchema(stringRequiredNoEmpty(tagLength), 'tag');

const createAndOrAssociateTagsSchema = Joi.object({
    tags:tagsSchema
});

const tagSchema = Joi.object({
    nombre:stringRequiredNoEmpty(tagLength),
    postId:idSchema('post')
});

const updateTagSchema = Joi.object({
    nombre:stringRequiredNoEmpty(tagLength)
});

module.exports = {tagSchema, tagsSchema, updateTagSchema, createAndOrAssociateTagsSchema};