const {Router} = require('express');
const router = Router();
const {commentController, genericController} = require('../controllers');
const {genericMiddleware, commentMiddleware} = require('../middlewares')
const {Comment, Post, User} = require('../db/models');
const {commentSchemas} = require('../schemas');

router.get('/', genericController.getAll(Comment));

router.get('/recent/post/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Post),
    commentController.getVisibleCommentsByPost
);

router.get('/recent', commentController.getVisibleComments);

router.get('/post/:postId/user/:userId',
    genericMiddleware.idsValidation,
    commentMiddleware.idsExistByModel(Post, User),
    commentMiddleware.postCommentedByUser,
    commentController.getCommentsOnPostByUser
);

router.get("/user/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    commentController.getUserComments
);

router.get('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Comment),    
    genericController.getById(Comment)
);

router.post('/',
    genericMiddleware.idValidationBody('postId'),
    genericMiddleware.idValidationBody('userId'),
    genericMiddleware.schemaValidator(commentSchemas.commentSchema),
    genericMiddleware.idExistByModelBody(Post, 'postId'),
    genericMiddleware.idExistByModelBody(User, 'userId'),
    commentMiddleware.creadoValidation,
    genericController.create(Comment)
);

router.put('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Comment),
    genericMiddleware.schemaValidator(commentSchemas.updateCommentSchema),
    genericController.update(Comment)
);

router.delete('/:id',
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(Comment),
    genericController.remove(Comment)
);

module.exports = router;