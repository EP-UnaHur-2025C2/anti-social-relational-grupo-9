const Joi = require('joi');
const {idSchema, stringSchema, stringArraySchema} = require('./generic.schema');

const urlSchemaParams = {text:'url', minLength:5, maxLength:75};

const urlSchema = stringSchema(urlSchemaParams);
const arrayImagesSchema = stringArraySchema(urlSchemaParams)

const createAssociateImagesSchema = Joi.object({urls:arrayImagesSchema});

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