const Joi = require('joi');
const {idSchema, stringSchema, stringArraySchema} = require('./generic.schema');

const validateUrlParams = {text:'url', minLength:5, maxLength:75};
const urlSchema = stringSchema(validateUrlParams);
const arrayImagesSchema = stringArraySchema(validateUrlParams)

const createAssociateImagesSchema = Joi.object({urls:arrayUrlsSchema});

const imageSchema = Joi.object({
    url:urlSchema,
    postId:idSchema('post')
});

const updateImageSchema = Joi.object({url:urlSchema});

module.exports = {
    imageSchema,
    arrayImagesSchema,
    updateImageSchema,
    createAssociateImagesSchema
};