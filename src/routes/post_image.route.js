const {Router} = require('express');
const router = Router();
const {imageController} = require('../controllers');
const {genericMiddleware, imageMiddleware} = require('../middlewares')
const {Post_Image, Post} = require('../db/models');
const {imageSchemas} = require('../schemas')

router.get('/', imageController.getImages);

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    imageController.getImageById
);

router.get('/:id/tags',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    imageController.getImageTags
);

router.post('/',
    genericMiddleware.schemaValidator(imageSchemas.imageSchema),
    genericMiddleware.idValidationBody('postId'),
    genericMiddleware.idExistByModelBody(Post, 'postId'),
    imageMiddleware.urlValidation,
    imageController.createImage
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    genericMiddleware.schemaValidator(imageSchemas.updateImageSchema),
    imageMiddleware.urlValidation,
    imageController.updateImage
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    imageController.deleteImage
);

module.exports = router;