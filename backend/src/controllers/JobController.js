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

  getAllJobsPaginatedController = async (req, res, next) => {
    try {
      // 1. Extract specifically what we allow (Security best practice)
      const {
        page,
        limit,
        search,
        location,
        jobType,
        experienceLevel,
        minSalary,
        maxSalary,
        sort,
      } = req.query;

      const response = await JobService.getAllJobsPaginated({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        location,
        jobType, // e.g. "FullTime,PartTime"
        experienceLevel, // e.g. "Senior,Mid"
        minSalary,
        maxSalary,
        sort,
      });

      res.status(200).json(response);
    } catch (error) {
      // Pass error to global error handler middleware
      next(error);
    }
  };

  getCompanyJobsPaginatedController = async (req, res) => {
    const { companyId } = req.params;
    const response = await JobService.getCompanyJobsPaginated({
      companyId,
      ...req.query,
    });
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
