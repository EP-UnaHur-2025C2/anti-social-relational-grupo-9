const Joi = require('joi');
const {fechaSchema, stringSchema} = require('./generic.schema');

const validateNickNameParams = {text: 'nickName', minLength:8, maxLength:50};

const userSchema = Joi.object({
    nickName:stringSchema(validateNickNameParams),
    fechaNacimiento:fechaSchema,
    email:Joi.string().required().email().messages({
        "any.required":"El email es obligatorio.",
        "string.email": "Debe ingresar un mail con formato valido. Ej: usuario@gmail.com.",
        "string.empty":"El campo email no puede estar vacio."
    }),
});

module.exports = {userSchema};
