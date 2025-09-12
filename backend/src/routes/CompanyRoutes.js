import express from "express";
import CompanyController from "../controllers/CompanyController.js";
import authenticate, { authorizeRoles } from "../middlewares/authMiddleware.js"; 

const router = express.Router();
const companyController = new CompanyController();

router.post("/createCompany",  authenticate,
  authorizeRoles("employer"), companyController.createCompanyController
);

router.get("/getCompanyDetails/:id", companyController.getCompanyByIdController
);

router.get("/getAllCompany", companyController.getAllCompaniesPaginatedController
);

router.put("/editCompanyDetails/:id", authenticate,
  authorizeRoles("employer", "admin"), companyController.updateCompanyController
);

router.delete("/deleteCompany/:id",   authenticate,
  authorizeRoles("employer", "admin"), companyController.deleteCompanyController
);

export default router;
