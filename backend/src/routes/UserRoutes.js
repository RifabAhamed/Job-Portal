import express from "express";
import authenticate from "../middlewares/authMiddleware.js";
import { inviteUserValidationSchema, loginUserValidationSchema, paginationSchema, registerUserValidationSchema } from "../validations/UserValidations.js";
import UserController from "../controllers/UserController.js";
import validate from "../middlewares/validationMiddleware.js"
import { authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../configs/cloudinaryConfig.js";
import JobController from "../controllers/JobController.js";


const router = express.Router();
const userController = new UserController();
const jobController = new JobController();


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
  authenticate,
  upload.single("resume"),
  userController.uploadResumeController
);

router.get("/view-resume", authenticate, userController.viewResumeController);

router.put(
  "/update-resume",
  authenticate,
  upload.single("resume"),
  userController.updateResumeController
);

router.delete("/resume", authenticate, userController.deleteResumeController);

// Debug route to compute signature for a given public_id and timestamp
router.get(
  "/debug/cloudinary",
  authenticate,
  userController.cloudinaryDebugController
);

// Get all saved jobs for the logged-in candidate (for MyAccount.jsx)
router.get(
  "/getSavedJobs",
  authenticate,
  authorizeRoles("jobseeker"),
  jobController.getSavedJobsController,
);


export default router;
