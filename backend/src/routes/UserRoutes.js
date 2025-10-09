import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { loginUserValidationSchema, paginationSchema, registerUserValidationSchema } from "../validations/UserValidations.js";
import UserController from "../controllers/UserController.js";
import validate from "../middlewares/validationMiddleware.js"
import { authorizeRoles } from "../middlewares/authMiddleware.js";


const router = express.Router();
const userController = new UserController();

router.post(
  "/login",
  validate(loginUserValidationSchema),
  userController.loginController
);
router.post("/logout", authenticate, userController.logoutController);

router.post("/reset-password", userController.resetPasswordController); 
router.post("/submit-new-password", userController.submitNewPasswordController);
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
  authorizeRoles("admin"),
  userController.getAllUsersPaginatedController
);

router.post(
  "/register-user",
  validate(registerUserValidationSchema),
  userController.registerUserController
);


router.patch(
  "/role/:id",
  authenticate,
  authorizeRoles("admin"),
  userController.updateUserRoleController
);



export default router;
