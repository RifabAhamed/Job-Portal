import express from "express";
import JobApplicationController from "../controllers/JobApplicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const controller = new JobApplicationController();

router.post("/:jobId/apply", authMiddleware, controller.applyToJobController);
router.get("/myApplication", authMiddleware, controller.getMyApplicationsController);
router.get(
  "/job/:jobId",
  authMiddleware,
  controller.getApplicationsForJobController
);
router.patch(
  "/:id/status",
  authMiddleware,
  controller.updateApplicationStatusController
);
router.delete("/deleteApplication/:id", authMiddleware, controller.deleteApplicationController);

export default router;
