const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comment.route');
const tagRoute = require('./tag.route');
const imageRoute = require('./post_image.route');
const followRoute = require('./follow.route')

module.exports = {
    userRoute,
    postRoute,
    commentRoute,
    tagRoute,
    imageRoute,
    followRoute
};