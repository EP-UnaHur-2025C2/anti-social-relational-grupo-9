const {Router} = require('express');
const router = Router();
const {tagController, genericController} = require('../controllers');
const {genericMiddleware, tagMiddleware} = require('../middlewares');
const {Tag, Post} = require('../db/models');
const {tagSchemas} = require('../schemas');

router.get('/', genericController.getAll(Tag));

router.get('/:id/posts',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getPostsByTag
);

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    genericController.getById(Tag)
);

router.get('/:id/users',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getUsersByTag
);

router.get('/:id/images',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getImagesByTag
);

router.post('/',
    genericMiddleware.schemaValidator(tagSchemas.tagSchema),
    genericMiddleware.idValidationBody('postId'),
    genericMiddleware.idExistByModelBody(Post, 'postId'),
    tagMiddleware.nombreValidation,
    genericController.create(Tag)
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    genericMiddleware.schemaValidator(tagSchemas.updateTagSchema),
    tagMiddleware.nombreValidation,
    genericController.update(Tag)
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    genericController.remove(Tag)
);

module.exports = router;