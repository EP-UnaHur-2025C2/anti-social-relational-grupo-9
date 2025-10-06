const {Router} = require('express');
const router = Router();
const {userController} = require('../controllers');

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;