import express from "express";
const router = express.Router();
import UserController from "../controller/userController";

const controller = new UserController()

router.post('/user',controller.newUser);
router.post('/updateUser',controller.editUser);
router.get('/user',  controller.find);
router.get('/user/:id', controller.findOne);
router.post('/deleteUser', controller.deleteOne);

export default router;