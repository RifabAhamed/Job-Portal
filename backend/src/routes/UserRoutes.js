import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { inviteUserValidationSchema, loginUserValidationSchema, paginationSchema, registerUserValidationSchema } from "../validations/UserValidations.js";
import UserController from "../controllers/UserController.js";
import validate from "../middlewares/validationMiddleware.js"
import { authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../configs/cloudinaryConfig.js";


const router = express.Router();
const userController = new UserController();

router.post(
  "/login",
  validate(loginUserValidationSchema),
  userController.loginController
);
router.post("/logout", authenticate, userController.logoutController);

router.post(
  "/invite-user",
  authenticate,
  authorizeRoles("admin"),
  validate(inviteUserValidationSchema),
  userController.inviteEmployerController
);


router.post("/accept-invite", userController.acceptInviteController);


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

router.post(
  "/upload-resume",
  authenticate, // 1. Check if the user is logged in
  upload.single("resume"), // 2. Process the file upload
  userController.uploadResumeController // 3. Pass control to the controller
);

router.get("/resume", authenticate, userController.viewResumeController);

router.put(
  "/resume",
  authenticate,
  upload.single("resume"),
  userController.updateResumeController
);

router.delete("/resume", authenticate, userController.deleteResumeController);


export default router;
