const userController = require('./user.controller');
const postController = require('./post.controller');
const commentController = require('./comment.controller');
const tagController = require('./tag.controller');
const imageController = require('./post_image.controller');
const genericController = require('./generic.controller');
const followController = require('./follow.controller');

module.exports = {
    userController,
    postController,
    commentController,
    tagController,
    imageController,
    genericController,
    followController
};