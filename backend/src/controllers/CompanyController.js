import CompanyService from "../services/CompanyService.js";

class CompanyController {
  createCompanyController = async (req, res) => {
    const companyData = req.body;
    // If a file was uploaded, add the file URL to the data
    if (req.file) {
      companyData.logo = req.file.path || req.file.secure_url;
    }
    const response = await CompanyService.createCompany(req.user, companyData);
    res.status(response.status).json(response);
  };

  getCompanyByIdController = async (req, res) => {
    const { id } = req.params;
    const response = await CompanyService.getCompanyById(id);
    res.status(response.status).json(response);
  };

  getAllCompaniesPaginatedController = async (req, res) => {
    const response = await CompanyService.getAllCompaniesPaginated(req.query);
    res.status(response.status).json(response);
  };

  updateCompanyController = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    // If a file was uploaded, add the file URL to the data
    if (req.file) {
      updateData.logo = req.file.path || req.file.secure_url;
    }
    const response = await CompanyService.updateCompany(
      req.user,
      id,
      updateData,
    );
    res.status(response.status).json(response);
  };

  deleteCompanyController = async (req, res) => {
    const { id } = req.params;
    const response = await CompanyService.deleteCompany(req.user, id);
    res.status(response.status).json(response);
  };

  getEmployerCompaniesController = async (req, res) => {
    const response = await CompanyService.getEmployerCompaniesPaginated(
      req.user,
      req.query,
    );
    res.status(response.status).json(response);
  };
}

export default CompanyController;
