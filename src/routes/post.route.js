const {Router} = require('express');
const router = Router();
const {postController} = require('../controllers');
const {postMiddleware, genericMiddleware, imageMiddleware, commentMiddleware} = require('../middlewares')
const {Post, User} = require('../db/models');
const {postSchemas, commentSchemas, imageSchemas, tagSchemas} = require('../schemas')

router.get('/', postController.getPosts);

router.get('/comments', postController.getFullPostsWithComments);

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.getPostById
);

router.get('/:id/comments',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.getFullPostWithComments
);

router.post('/',
    genericMiddleware.schemaValidator(postSchemas.postSchema),
    genericMiddleware.idValidationBody('userId'),
    genericMiddleware.idExistByModelBody(User, 'userId'),
    postMiddleware.creadoValidation,
    postController.createPost
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    genericMiddleware.schemaValidator(postSchemas.updatePostSchema),
    postController.updatePost
);

router.post("/:id/create-comment",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    genericMiddleware.schemaValidator(commentSchemas.postCommentSchema),
    genericMiddleware.idValidationBody('userId'),
    genericMiddleware.idExistByModelBody(User, 'userId'),
    commentMiddleware.creadoValidation,
    postMiddleware.postBeforeCommentValidation,
    postController.createAssociateComment
);

router.post("/:id/create-images",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    genericMiddleware.schemaValidator(postSchemas.createAssociateImagesSchema),
    imageMiddleware.urlsValidation,
    postController.createAssociateImages
);

router.post("/:id/create-tags",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    genericMiddleware.schemaValidator(postSchemas.createAndOrAssociateTagsSchema),
    postController.createAndOrAssociateTags
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.deletePost
);

module.exports = router;