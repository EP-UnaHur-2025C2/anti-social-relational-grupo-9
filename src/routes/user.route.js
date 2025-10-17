const {Router} = require('express');
const router = Router();
const {userController, genericController} = require('../controllers');
const {userMiddleware, postMiddleware, imageMiddleware, genericMiddleware} = require('../middlewares');
const {User, Follow} = require('../db/models')
const {userSchemas, postSchemas} = require('../schemas')

router.get("/", genericController.getAll(User));

router.get("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericController.getById(User)
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
    genericMiddleware.schemaValidator(userSchemas.userSchema),
    userMiddleware.nickNameValidation,
    userMiddleware.emailValidation,
    userMiddleware.fechaNacimientoValidation,
    genericController.create(User)
);

router.post("/:id/create-post",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(postSchemas.createAssociatePostSchema),
    postMiddleware.creadoValidation,
    userController.createAssociatePost
);

router.post("/:id/create-post-full",//borrar esta ruta junto a la funcion controladora
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(postSchemas.createPostFullSchema),
    postMiddleware.creadoValidation,
    imageMiddleware.urlsValidation,
    userController.createPostFull
);

router.put("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(userSchemas.userSchema),
    userMiddleware.updateNickNameValidation,
    userMiddleware.updateEmailValidation,
    userMiddleware.fechaNacimientoValidation,
    genericController.update(User)
);

router.delete("/:id",
    genericMiddleware.idsValidation,
    genericMiddleware.idExistByModel(User),
    genericController.remove(User)
);

module.exports = router;