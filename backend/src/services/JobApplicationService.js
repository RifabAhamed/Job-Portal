import JobRepository from "../repositories/JobRepository.js";
import JobApplicationRepository from "../repositories/JobApplicationRepository.js";

const JobApplicationService = {
  // Jobseeker applies to a job
  async applyToJob(user, jobId, { resume, coverLetter }) {
    if (user.role !== "jobseeker") {
      return {
        status: 403,
        message: "Only jobseekers can apply to jobs",
      };
    }

    const job = await JobRepository.findById(jobId);
    if (!job) {
      return {
        status: 404,
        message: "Job not found",
      };
    }

    // Prevent duplicate applications
    const existingApplication = await JobApplicationRepository.findByApplicant(
      user._id
    );
    const alreadyApplied = existingApplication.applications.find(
      (app) => app.job.toString() === jobId.toString()
    );
    if (alreadyApplied) {
      return {
        status: 400,
        message: "You have already applied for this job",
      };
    }

    const application = await JobApplicationRepository.create({
      job: jobId,
      applicant: user._id,
      resume,
      coverLetter,
    });

    return {
      status: 201,
      message: "Application submitted successfully",
      data: application,
    };
  },

  // Jobseeker fetches own applications
  async getMyApplications(user, { page = 1, limit = 10 }) {
    if (user.role !== "jobseeker") {
      return {
        status: 403,
        message: "Only jobseekers can view their applications",
      };
    }

    const applications = await JobApplicationRepository.findByApplicant(
      user._id,
      page,
      limit
    );
    return { status: 200, data: applications };
  },

  // Employer fetches applications for a job they created
  async getApplicationsForJob(user, jobId, { page = 1, limit = 10 }) {
    if (user.role !== "employer") {
      return {
        status: 403,
        message: "Only employers can view applications for their jobs",
      };
    }

    const job = await JobRepository.findById(jobId);
    if (!job) {
      return { status: 404, message: "Job not found" };
    }

    if (job.createdBy._id.toString() !== user._id.toString()) {
      return {
        status: 403,
        message: "You are not allowed to view applications for this job",
      };
    }

    const applications = await JobApplicationRepository.findByJob(
      jobId,
      page,
      limit
    );
    return { status: 200, data: applications };
  },

  // Employer updates status of an application
  async updateApplicationStatus(user, applicationId, { status, notes }) {
    if (user.role !== "employer") {
      return {
        status: 403,
        message: "Only employers can update application status",
      };
    }

    const updatedApplication = await JobApplicationRepository.updateStatus(
      applicationId,
      status,
      notes
    );
    if (!updatedApplication) {
      return { status: 404, message: "Application not found" };
    }

    return {
      status: 200,
      message: "Application status updated successfully",
      data: updatedApplication,
    };
  },

  // Jobseeker can delete their own application
  async deleteApplication(user, applicationId) {
    const application = await JobApplicationRepository.findById(applicationId);
    if (!application) {
      return { status: 404, message: "Application not found" };
    }

    // if (
    //   user.role !== "jobseeker" ||
    //   application.applicant._id.toString() !== user._id.toString()
    // ) {
    //   return {
    //     status: 403,
    //     message: "You are not allowed to delete this application",
    //   };
    // }

    await JobApplicationRepository.delete(applicationId);
    return { status: 200, message: "Application deleted successfully" };
  },
};

export default JobApplicationService;
