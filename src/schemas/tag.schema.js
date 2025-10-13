const Joi = require('joi');
const {idSchema, stringSchema, stringArraySchema} = require('./generic.schema');

const validateNombreParams = {text:'nombre', minLength:2, maxLength:25};
const nombreSchema = stringSchema(validateNombreParams);
const arrayTagsSchema = stringArraySchema({text:'tag', ...validateNombreParams});

const createAndOrAssociateTagsSchema = Joi.object({tags:arrayTagsSchema});

const tagSchema = Joi.object({
    nombre:nombreSchema,
    postId:idSchema('post')
});

const updateTagSchema = Joi.object({nombre:nombreSchema});

module.exports = {
    tagSchema,
    arrayTagsSchema,
    updateTagSchema,
    createAndOrAssociateTagsSchema
};