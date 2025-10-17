const {User, Follow} = require('../db/models');

const userFollowers = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    const followers = await user.getFollowers()
    res.status(200).json(followers);
};

const userFollowings = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    const followings = await user.getFollowings()
    res.status(200).json(followings);
};

const createFollower = async (req, res) => {
    const followerId = req.params.id;
    const {followedId} = req.body;
    const follower = await User.findByPk(followerId)
    const followed = await User.findByPk(followedId)
    await follower.addFollowing(followed)
    const follow = await Follow.findAll({where:{followerId, followedId}, include:[{model:User, as:'follower'}, {model:User, as:'followed'}]})
    res.status(201).json(follow);
};
const updateFollowing = async (req, res) => {
    const followerId = req.params.id;
    const {followedId, newFollowedId} = req.body;
    const updatedFollow = await Follow.update(newFollowedId, {where:{followerId, followedId}, include:[{model:User, as:'follower'}, {model:User, as:'followed'}]})
    res.status(201).json(updatedFollow);
};
const deleteFollowing = async (req, res) => {
    const followerId = req.params.id;
    const {followedId} = req.body;
    const follower = await User.findByPk(followerId)
    const followed = await User.findByPk(followedId)
    await follower.addFollowing(followed)
    const follow = await Follow.findAll({where:{followerId, followedId}, include:[{model:User, as:'follower'}, {model:User, as:'followed'}]})
    res.status(201).json(follow);
};



module.exports = {
    userFollowers,
    userFollowings,
    createFollower,
    updateFollowing,
    deleteFollowing
};