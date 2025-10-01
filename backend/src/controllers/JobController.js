import JobService from "../services/JobService.js";

class JobController {
  createJobController = async (req, res) => {
    const { companyId } = req.params; // companyId should be passed in the route
    const response = await JobService.createJob(req.user, companyId, req.body);
    res.status(response.status).json(response);
  };

  getJobByIdController = async (req, res) => {
    const { id } = req.params;
    const response = await JobService.getJobById(id);
    res.status(response.status).json(response);
  };

  getAllJobsPaginatedController = async (req, res) => {
    const response = await JobService.getAllJobsPaginated(req.query);
    res.status(response.status).json(response);
  };

  getCompanyJobsPaginatedController = async (req, res) => {
    const { companyId } = req.params;
    const response = await JobService.getCompanyJobsPaginated({companyId, ...req.query});
    res.status(response.status).json(response);
  };

  updateJobController = async (req, res) => {
    const { id } = req.params;
    const response = await JobService.updateJob(req.user, id, req.body);
    res.status(response.status).json(response);
  };

  deleteJobController = async (req, res) => {
    const { id } = req.params;
    const response = await JobService.deleteJob(req.user, id);
    res.status(response.status).json(response);
  };
}

export default JobController;
