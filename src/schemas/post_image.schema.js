const Joi = require('joi');
const {idSchema, stringRequiredNoEmpty, arraySchema} = require('./generic.schema');

const imageLength = {text: 'La url', minLength:5, maxLength:75};

const urlImagesSchema = arraySchema(stringRequiredNoEmpty(imageLength), 'url');

const createAssociateImagesSchema = Joi.object({
    urls:urlImagesSchema
});

const imageSchema = Joi.object({
    url:stringRequiredNoEmpty(imageLength),
    postId:idSchema('post')
});

const updateImageSchema = Joi.object({
    url:stringRequiredNoEmpty(imageLength)
});

module.exports = {imageSchema, urlImagesSchema, updateImageSchema, createAssociateImagesSchema};