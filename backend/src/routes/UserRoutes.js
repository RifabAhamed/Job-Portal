import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { loginUserValidationSchema, paginationSchema, registerUserValidationSchema } from "../validations/UserValidations.js";
import UserController from "../controllers/userController.js";
import validate from "../middlewares/validationMiddleware.js"


const router = express.Router();
const userController = new UserController();

router.post(
  "/login",
  validate(loginUserValidationSchema),
  userController.loginController
);
router.post("/logout", authenticate, userController.logoutController);

router.post("/reset-password", userController.resetPasswordController); 
router.post("/set-new-password", userController.setNewPasswordController);
router.post(
  "/update-password",
  authenticate,
  userController.updatePasswordController
);

router.get("/auth", authenticate, userController.getUserByIdController);
router.get(
  "/get-all-users",
  validate(paginationSchema),
  authenticate,
  userController.getAllUsersPaginatedController
);

router.post(
  "/register-user",
  validate(registerUserValidationSchema),
  userController.registerUserController
);

export default router;
