const {Router} = require('express');
const router = Router();
const {postController} = require('../controllers');
const {postMiddleware, genericMiddleware, imageMiddleware, commentMiddleware} = require('../middlewares')
const {Post, User} = require('../db/models');

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
    genericMiddleware.idValidationBody('userId'),
    genericMiddleware.idExistByModelBody(User, 'userId'),
    postMiddleware.creadoValidation,
    postController.createPost
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.updatePost
);

router.post("/:id/create-comment",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    genericMiddleware.idValidationBody('userId'),
    genericMiddleware.idExistByModelBody(User, 'userId'),
    commentMiddleware.creadoValidation,
    postMiddleware.postBeforeCommentValidation,
    postController.createAssociateComment
);

router.post("/:id/create-images",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    imageMiddleware.urlsValidation,
    postController.createAssociateImages
);

router.post("/:id/create-tags",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.createAndOrAssociateTags
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    postController.deletePost
);

module.exports = router;