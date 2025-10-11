const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');
const {genericMiddleware, tagMiddleware} = require('../middlewares')
const {Tag, Post} = require('../db/models')

router.get('/', tagController.getTags);

router.get('/:id/posts',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getPostsByTag
);

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getTagById
);

router.get('/:id/users',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getUsersByTag);

router.get('/:id/images',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getImagesByTag);

router.post('/',
    genericMiddleware.idValidationBody('postId'),
    genericMiddleware.idExistByModelBody(Post, 'postId'),
    tagMiddleware.nombreValidation,
    tagController.createTag
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagMiddleware.nombreValidation,
    tagController.updateTag
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.deleteTag
);

module.exports = router;