const {Router} = require('express');
const router = Router();
const {commentController} = require('../controllers');

router.get('/', commentController.getComments);

router.get('/recent/post/:id', commentController.getVisibleCommentsByPost);

router.get('/recent', commentController.getVisibleComments);

router.get('/post/:postId/user/:userId', commentController.getCommentsOnPostByUser);

router.get("/user/:id", commentController.getUserComments);

router.get('/:id',commentController.getCommentById);

router.post('/',commentController.createComment);

router.put('/:id',commentController.updateComment);

router.delete('/:id',commentController.deleteComment);

module.exports = router;