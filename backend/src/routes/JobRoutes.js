import express from "express";
import JobController from "../controllers/JobController.js";
import authenticate, { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
const jobController = new JobController();

router.post(
  "/createJob/:companyId",
  authenticate,
  authorizeRoles("employer"),
  jobController.createJobController
);

router.get("/getJobDetails/:id", jobController.getJobByIdController);

router.get("/getAllJobs", jobController.getAllJobsPaginatedController);
router.get("/getCompanyJobs/:companyId", jobController.getCompanyJobsPaginatedController);

router.put(
  "/editJobDetails/:id",
  authenticate,
  authorizeRoles("employer", "admin"),
  jobController.updateJobController
);

router.delete(
  "/deleteJob/:id",
  authenticate,
  authorizeRoles("employer", "admin"),
  jobController.deleteJobController
);

export default router;
