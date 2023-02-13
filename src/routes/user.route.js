import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to register a new user
router.post('/Register', newUserValidator, userController.registerNewUser);

//route to login user
router.post('/login', userController.login);

//route to forgoy password.
router.post('/forgotpwd', userController.forgotPassword);

//route to resetpwd.
router.put('/resetpwd',userAuth,userController.resetPassword)

export default router;