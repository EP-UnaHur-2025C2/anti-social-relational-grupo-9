const Joi = require('joi');

const fechaSchema = Joi.string().required().length(10).messages({
    "any.required":"El campo fecha es obligatorio.",
    "string.length": "El campo fecha debe tener {#limit} caracteres de largo con formato YYYY-MM-DD.",
    "string.empty":"El campo fecha no puede estar vacio."
});

const idSchema = (model) => Joi.number().required().messages({
    "any.required":`El id de ${model} es obligatorio.`,
    "number.base":`El id de ${model} debe ser un numero.`
});

const stringRequiredNoEmpty = ({text, minLength, maxLength}) => {
    return Joi.string().required().min(minLength).max(maxLength).messages({
            "any.required":`${text} es obligatorio/a.`,
            "string.min": `${text} debe tener {#limit} caracteres como minimo.`,
            "string.max": `${text} debe tener {#limit} caracteres como maximo .`,
            "string.empty":`${text} no puede ser vacio/a.`,
            "string.base": `${text} debe ser un string`
    });
};

const arraySchema = (schema, property) => Joi.array().required().items(schema).messages({
    "array.base":`${property} debe ser un array.`,
    "array.includesRequiredUnknowns":`El array de ${property} debe tener al menos un tag`,
});

module.exports = {fechaSchema, idSchema, stringRequiredNoEmpty, arraySchema};