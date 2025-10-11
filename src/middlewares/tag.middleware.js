const {Tag} = require('../db/models');

const nombreValidation =  async (req, res, next) => {
    const {nombre} = req.body;
    const tagFound = await Tag.findOne({where:{nombre}});
    if(tagFound)
        return res.status(400).json(`tagMid nombreValidation - El tag ${tagFound.nombre} ya existe.`);
    next();
};

/* solo se usa para el createTag de tag.controller
en post.controller y user.controller no se usa ya que en ellos se valida en funcion de si existe
o no el tag se hace un add al post o se crea con el id del post */

module.exports = {nombreValidation};