import { Router } from 'express';

import tryCatch from '@/middlewares/tryCatch.middleware';
import userController from '@/controllers/user.controller';
import { validate } from '@/middlewares/validator.middleware';
import { changePasswordSchema, forgotPasswordSchema, loginUserSchema, refreshTokenSchema, registerUserSchema, updateUserSchema } from '@/validations/user.validation';
import { authenticateJWT } from '@/middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.post(
	'/register',
	validate(registerUserSchema),
	tryCatch(userController.registerUser.bind(userController)),
)

userRouter.post(
	'/login',
	validate(loginUserSchema),
	tryCatch(userController.loginUser.bind(userController)),
)

userRouter.post(
	'/logout',
	authenticateJWT,
	tryCatch(userController.logoutUser.bind(userController)),
)

userRouter.get(
	'/me',
	authenticateJWT,
	tryCatch(userController.getMe.bind(userController)),
)

userRouter.get(
	'/verify-email/:token',
	tryCatch(userController.verifyUser.bind(userController)),
)

userRouter.post(
	'/forgot-password',
	validate(forgotPasswordSchema),
	tryCatch(userController.forgotPassword.bind(userController)),
)

userRouter.post(
	'/change-password',
	validate(changePasswordSchema),
	tryCatch(userController.changePassword.bind(userController)),
)

userRouter.post(
	'/refresh-token',
	validate(refreshTokenSchema),
	tryCatch(userController.updateRefreshToken.bind(userController)),
)

userRouter.put(
	'/:userId',
	validate(updateUserSchema),
	tryCatch(userController.updateUser.bind(userController)),
)

export default userRouter;
