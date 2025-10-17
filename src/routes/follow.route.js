const {Router} = require('express');
const router = Router();
const {followController} = require('../controllers');
const {userMiddleware, postMiddleware, imageMiddleware, genericMiddleware} = require('../middlewares');
const {User, Follow} = require('../db/models')
const {userSchemas, postSchemas} = require('../schemas')

router.get("/:id/followers",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    followController.userFollowers
)

router.get("/:id/followings",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    followController.userFollowings
)

router.post("/:id/create-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idExistByModel(User),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    followController.createFollower
);
router.put("/:id/update-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idValidationBody('newFollowedId'),
    genericMiddleware.idExistByModel(User),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    genericMiddleware.idExistByModelBody(User, 'newFollowedId'),
    followController.updateFollowing
);
router.delete("/:id/delete-follow",
    genericMiddleware.idsValidation,
    genericMiddleware.idValidationBody('followedId'),
    genericMiddleware.idExistByModel(User),
    genericMiddleware.idExistByModelBody(User, 'followedId'),
    followController.deleteFollowing
);

module.exports = router;