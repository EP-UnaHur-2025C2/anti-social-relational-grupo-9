const {User} = require('../db/models');

const getUsers = async (req, res) => {
    const users = await User.findAll({});
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    await User.update(req.body, {where:{id}})
    const userUpdated = await User.findByPk(id);
    res.status(201).json(userUpdated);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const userDeleted = await user.destroy();
    res.status(200).json(userDeleted);
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
};