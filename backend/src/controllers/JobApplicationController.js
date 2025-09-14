import JobApplicationService from "../services/JobApplicationService.js";

class JobApplicationController {
  // Jobseeker applies to a job
  applyToJobController = async (req, res) => {
    const { jobId } = req.params; // jobId should be passed in the route
    const response = await JobApplicationService.applyToJob(
      req.user,
      jobId,
      req.body
    );
    res.status(response.status).json(response);
  };

  // Jobseeker fetches their own applications
  getMyApplicationsController = async (req, res) => {
    const response = await JobApplicationService.getMyApplications(
      req.user,
      req.query
    );
    res.status(response.status).json(response);
  };

  // Employer fetches applications for a specific job
  getApplicationsForJobController = async (req, res) => {
    const { jobId } = req.params;
    const response = await JobApplicationService.getApplicationsForJob(
      req.user,
      jobId,
      req.query
    );
    res.status(response.status).json(response);
  };

  // Employer updates the status of an application
  updateApplicationStatusController = async (req, res) => {
    const { id } = req.params; // applicationId
    const response = await JobApplicationService.updateApplicationStatus(
      req.user,
      id,
      req.body
    );
    res.status(response.status).json(response);
  };

  // Jobseeker deletes their own application
  deleteApplicationController = async (req, res) => {
    const { id } = req.params; // applicationId
    const response = await JobApplicationService.deleteApplication(
      req.user,
      id
    );
    res.status(response.status).json(response);
  };
}

export default JobApplicationController;
