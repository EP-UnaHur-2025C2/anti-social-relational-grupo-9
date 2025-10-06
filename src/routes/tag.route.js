const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');

router.get('/', tagController.getTags);

router.get('/:id',tagController.getTagById);

router.post('/',tagController.createTag);

router.put('/:id',tagController.updateTag);

router.delete('/:id',tagController.deleteTag);

module.exports = router;