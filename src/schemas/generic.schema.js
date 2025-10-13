const Joi = require('joi');

const fechaSchema = Joi.string().required().length(10).messages({
    "any.required":"La fecha de creacion es obligatoria.",
    "string.length": "La fecha de creacion debe tener {#limit} caracteres de largo con formato YYYY-MM-DD.",
    "string.empty":"La fecha de creacion no puede ser un campo vacio."
});

const idSchema = (model) => Joi.number().required().messages({
    "any.required":`El id de ${model} es obligatorio.`,
    "number.base":`El id de ${model} debe ser un numero.`
});

const stringSchema = ({text, minLength, maxLength}) => {
    return Joi.string().required().min(minLength).max(maxLength).messages({
            "any.required":`${text} es obligatorio/a.`,
            "string.min": `${text} debe tener {#limit} caracteres como minimo.`,
            "string.max": `${text} debe tener {#limit} caracteres como maximo.`,
            "string.empty":`${text} no puede ser vacio/a.`,
            "string.base": `${text} debe ser un string.`
    });
};

const arraySchema = ({text, schema}) => {
    return Joi.array().required().items(schema).messages({
        "array.base":`${text}s debe ser un array.`,
        "array.includesRequiredUnknowns":`El array de ${text}s debe tener al menos un elemento.`,
    });
};

const stringArraySchema = (params) => {
    return arraySchema(params.text, stringSchema(params));
};

module.exports = {
    fechaSchema,
    idSchema,
    stringSchema,
    arraySchema,
    stringArraySchema
};