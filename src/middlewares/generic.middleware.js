const idsValidation = (req, res, next) => {
    let msj = `genericMid idsValidation - Bad Request: `;
    for(let id in req.params) {
        if(req.params[id] <= 0) msj += `El ${id} no puede ser cero o negativo. `;
    };
    if(msj != `genericMid idsValidation - Bad Request: `)
        return res.status(400).json(msj);
    next()
};

const idValidationBody = (idModel) => {
    return  async (req, res, next) => {
        const id = req.body[idModel];
        if(id <= 0)
            return res.status(400).json(`genericMid IdValidationBody - Bad Request: El id no puede ser cero o negativo`)
        next();
    };
};

const idExistByModelBody = (model, idModel) => {
    return  async (req, res, next) => {
        const id = req.body[idModel];
        const idFound = await model.findByPk(id);
        if(!idFound)
            return res.status(404).json(`genericMid IdExistByModelBody - Not Found: El id ${id} no se encuentra registrado.`);
        next();
    };
};

const idExistByModel = (model) => {
    return  async (req, res, next) => {
        const id = req.params.id;
        const idFound = await model.findByPk(id);
        if(!idFound)
            return res.status(404).json(`genericMid idExistByModel - Not Found: El id ${id} no se encuentra registrado.`);
        next();
    };
};

const idExistByModel2 = (model, idModel) => {
    return async (req, res, next) => {
        const id = req.params[idModel];
        let idFound = await model.findByPk(id);
        if(!idFound)
            return res.status(404).json(`genericMid idExistByModel2 - Not Found: El id de ${idModel.slice(0, -2)} ${id} no se encuentra registrado`);
        next();
    };
};

const schemaValidator = (schema) => {
    return (req, res, next) => {
        const {error, _} = schema.validate(req.body, {abortEarly:false});
        if(error){
            const errores = error.details.map(e => {
                return {atributo:e.path[0], mensaje:e.message, tipoError:e.type}
            });
            return res.status(400).json(errores);
        }
        next()
    }
}

module.exports = {
    // idValidation,
    idsValidation,
    idValidationBody,
    idExistByModelBody,
    idExistByModel,
    schemaValidator,
    idExistByModel2
};