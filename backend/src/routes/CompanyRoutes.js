import express from "express";
import CompanyController from "../controllers/CompanyController.js";
import authenticate, { authorizeRoles } from "../middlewares/authMiddleware.js";
import { uploadLogo } from "../configs/cloudinaryConfig.js";

const router = express.Router();
const companyController = new CompanyController();

router.post(
  "/createCompany",
  authenticate,
  authorizeRoles("employer"),
  uploadLogo.single("logo"),
  companyController.createCompanyController,
);

router.get(
  "/getCompanyDetails/:id",
  companyController.getCompanyByIdController,
);

router.get(
  "/getAllCompany",
  companyController.getAllCompaniesPaginatedController,
);

router.put(
  "/editCompanyDetails/:id",
  authenticate,
  authorizeRoles("employer", "admin"),
  uploadLogo.single("logo"),
  companyController.updateCompanyController,
);

router.delete(
  "/deleteCompany/:id",
  authenticate,
  authorizeRoles("employer", "admin"),
  companyController.deleteCompanyController,
);

router.get(
  "/getMyCompanies",
  authenticate,
  authorizeRoles("employer"),
  companyController.getEmployerCompaniesController,
);

export default router;
