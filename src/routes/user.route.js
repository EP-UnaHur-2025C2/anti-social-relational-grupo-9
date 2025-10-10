const {Router} = require('express');
const router = Router();
const {userController} = require('../controllers');
const {userMiddleware, postMiddleware, imageMiddleware, genericMiddleware} = require('../middlewares');
const {User} = require('../db/models')

router.get("/", userController.getUsers);

router.get("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    userController.getUserById
);

router.get("/:id/posts",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    userController.getUserWithPosts
);

router.get("/:id/images",//pasar esta ruta a post_images junto con la funcion controladora
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    userController.getUserImages
);

router.post("/",
    userMiddleware.nickNameValidation,
    userMiddleware.emailValidation,
    userMiddleware.fechaNacimientoValidation,
    userController.createUser
);

router.post("/:id/create-post-full",//borrar esta ruta junto a la funcion controladora
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    postMiddleware.creadoValidation,
    imageMiddleware.urlsValidation,
    userController.createPostFull
);

router.put("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    userMiddleware.updateNickNameValidation,
    userMiddleware.updateEmailValidation,
    userMiddleware.fechaNacimientoValidation,
    userController.updateUser
);

router.delete("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    userController.deleteUser
);

module.exports = router;