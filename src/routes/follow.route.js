const {Router} = require('express');
const router = Router();
const {followController, genericController} = require('../controllers');
const {genericMiddleware, followMiddleware} = require('../middlewares');
const {User, Follow} = require('../db/models')
const {followSchemas} = require('../schemas')

router.get("/", genericController.getAll(Follow));

router.get("/:id/followers",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    followController.userFollowers
);

router.get("/:id/followings",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    followController.userFollowings
);

router.post("/:id/create-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(followSchemas.followIdSchema),
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    followMiddleware.autoFollowValidation('followedId'),
    followMiddleware.notFollowValidation('followedId'),
    followController.createFollower
);
router.put("/:id/update-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(followSchemas.updateFollowIdSchema),
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idValidationBody('newFollowedId'),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    genericMiddleware.idExistByModelBody(User, 'newFollowedId'),
    followMiddleware.autoFollowValidation('newFollowedId'),
    followMiddleware.followValidation('followedId'),
    followMiddleware.notFollowValidation('newFollowedId'),
    followController.updateFollowing
);

router.delete("/:id/delete-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(followSchemas.followIdSchema),
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    followMiddleware.autoFollowValidation('followedId'),
    followMiddleware.followValidation('followedId'),
    followController.deleteFollowing
);

module.exports = router;