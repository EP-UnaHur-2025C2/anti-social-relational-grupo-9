const getAll = (model) =>{
    return async (req, res) => {
            const data = await model.findAll({});
            res.status(200).json(data);
    };
};

const getById = (model) => {
    return async (req, res) => {
            const id = req.params.id;
            const data = await model.findByPk(id);
            res.status(200).json(data);
    };
};

const create = (model) => {
    return async (req, res) => {
            const record = await model.create(req.body);
            res.status(201).json(record);
    };
};

const update = (model) => {
    return async (req, res) => {
            const id = req.params.id;
            await model.update(req.body, {where:{id}})
            const updatedRecord = await model.findByPk(id);
            res.status(201).json(updatedRecord);
    };
};

const remove = (model) => {
    return async (req, res) => {
            const id = req.params.id;
            const record = await model.findByPk(id);
            const deletedRecord = await record.destroy();
            res.status(200).json(deletedRecord);
    };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};