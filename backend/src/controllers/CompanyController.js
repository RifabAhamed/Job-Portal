import CompanyService from "../services/CompanyService.js";

class CompanyController {
  createCompanyController = async(req, res) => {
    const response = await CompanyService.createCompany(req.user, req.body);
    res.status(response.status).json(response);
  }

  getCompanyByIdController = async(req, res) => {
    const { id } = req.params;
    const response = await CompanyService.getCompanyById(id);
    res.status(response.status).json(response);
  }

  getAllCompaniesPaginatedController = async(req, res) => {
    const response = await CompanyService.getAllCompaniesPaginated(req.query);
    res.status(response.status).json(response);
  }

  updateCompanyController = async(req, res) => {
    const { id } = req.params;
    const response = await CompanyService.updateCompany(req.user, id, req.body);
    res.status(response.status).json(response);
  }

  deleteCompanyController = async(req, res) => {
    const { id } = req.params;
    const response = await CompanyService.deleteCompany(req.user, id);
    res.status(response.status).json(response);
  }
}

export default CompanyController;
