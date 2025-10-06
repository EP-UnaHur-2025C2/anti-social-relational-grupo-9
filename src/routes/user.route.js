const {Router} = require('express');
const router = Router();
const {userController} = require('../controllers');

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.get("/:id/posts", userController.getUserWithPosts);

router.get("/:id/images", userController.getUserImages);//pasar esta ruta a post_images junto con la funcion controladora

router.post("/", userController.createUser);

router.post("/:id/create-post-full", userController.createPostFull);//borrar esta ruta junto a la funcion controladora

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;