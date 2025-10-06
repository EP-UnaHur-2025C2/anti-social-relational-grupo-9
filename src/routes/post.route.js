const {Router} = require('express');
const router = Router();
const {postController} = require('../controllers');

router.get('/', postController.getPosts);

router.get('/comments', postController.getFullPostsWithComments);

router.get('/:id', postController.getPostById);

router.get('/:id/comments', postController.getFullPostWithComments);

router.post('/', postController.createPost);

router.put('/:id', postController.updatePost);

router.post("/:id/create-comment", postController.createAssociateComment);

router.post("/:id/create-images", postController.createAssociateImages);

router.post("/:id/create-tags", postController.createAndOrAssociateTags);

router.delete('/:id', postController.deletePost);

module.exports = router;