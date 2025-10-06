const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');

router.get('/', tagController.getTags);

router.get('/:id/posts', tagController.getPostsByTag);

router.get('/:id', tagController.getTagById);

router.get('/:id/users', tagController.getUsersByTag);

router.get('/:id/images', tagController.getImagesByTag);

router.post('/', tagController.createTag);

router.put('/:id', tagController.updateTag);

router.delete('/:id', tagController.deleteTag);

module.exports = router;