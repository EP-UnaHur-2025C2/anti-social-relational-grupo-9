const {Router} = require('express');
const router = Router();
const {imageController, genericController} = require('../controllers');
const {genericMiddleware, imageMiddleware} = require('../middlewares')
const {Post_Image, Post} = require('../db/models');
const {imageSchemas} = require('../schemas')

router.get('/', genericController.getAll(Post_Image));

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    genericController.getById(Post_Image)
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
    genericController.create(Post_Image)
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    genericMiddleware.schemaValidator(imageSchemas.updateImageSchema),
    imageMiddleware.urlValidation,
    genericController.update(Post_Image)
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post_Image),
    genericController.remove(Post_Image)
);

module.exports = router;