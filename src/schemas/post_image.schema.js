const Joi = require('joi');
const {idSchema, stringRequiredNoEmpty, arraySchema} = require('./base.schema');

const imageLength = {text: 'La url', minLength:5, maxLength:75};

const urlImagesSchema = arraySchema(stringRequiredNoEmpty(imageLength), 'urlImages');

const imageSchema = Joi.object({
    url:stringRequiredNoEmpty(imageLength),
    postId:idSchema('post')
});

const updateImageSchema = Joi.object({
    url:stringRequiredNoEmpty(imageLength)
});

module.exports = {imageSchema, urlImagesSchema, updateImageSchema};