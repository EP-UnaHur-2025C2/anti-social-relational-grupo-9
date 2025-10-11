const Joi = require('joi');
const {idSchema, stringRequiredNoEmpty, arraySchema} = require('./base.schema');

const tagLength = {text: 'El contenido', minLength:2, maxLength:8000}

const tagsSchema = arraySchema(stringRequiredNoEmpty(tagLength), 'tags')

const tagSchema = Joi.object({
    nombre:stringRequiredNoEmpty(tagLength),
    postId:idSchema('post')
});

const updateTagSchema = Joi.object({
    nombre:stringRequiredNoEmpty(tagLength)
});

module.exports = {tagSchema, tagsSchema, updateTagSchema};