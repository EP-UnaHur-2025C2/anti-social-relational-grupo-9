const {Router} = require('express');
const router = Router();
const {imageController} = require('../controllers');

router.get('/', imageController.getImages);

router.get('/:id', imageController.getImageById);

router.post('/', imageController.createImage);

router.put('/:id', imageController.updateImage);

router.delete('/:id', imageController.deleteImage);

module.exports = router;