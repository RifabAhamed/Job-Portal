import CompanyRepository from "../repositories/CompanyRepository.js";
import JobRepository from "../repositories/JobRepository.js";

const JobService = {
  async createJob(user, companyId, jobData) {
    if (user.role !== "employer") {
      return {
        status: 403,
        message: "Only employers can create jobs",
      };
    }

    const company = await CompanyRepository.findById(companyId);
    if (!company) {
      return {
        status: 404,
        message: "Company Not Found",
      };
    }

    if (company.createdBy._id.toString() !== user._id.toString()) {
      return {
        status: 403,
        message: "You are not allowed to post jobs for this company",
      };
    }

    const job = await JobRepository.create({
      ...jobData,
      company: companyId,
      createdBy: user._id,
    });

    return {
      status: 201,
      message: "Job created successfully",
      data: job,
    };
  },

  async getJobById(id) {
    const job = await JobRepository.findById(id);
    if (!job) {
      return {
        status: 404,
        message: "Job not found",
      };
    }
    return {
      status: 200,
      data: job,
    };
  },

  async getAllJobsPaginated({ page = 1, limit = 10, filter = {} }) {
    const jobs = await JobRepository.getPaginatedJobs(page, limit, filter);
    return { status: 200, data: jobs };
  },

  async updateJob(user, jobId, updateData) {
    const job = await JobRepository.findById(jobId);
    if (!job) {
      return { status: 404, message: "Job not found" };
    }

    if (
      user.role !== "employer" &&
      job.createdBy._id.toString() !== user._id.toString()
    ) {
      return {
        status: 403,
        message: "You are not allowed to update this job",
      };
    }

    const updatedJob = await JobRepository.update(jobId, updateData);
    return {
      status: 200,
      message: "Job updated successfully",
      data: updatedJob,
    };
  },

  async deleteJob(user, jobId) {
    const job = await JobRepository.findById(jobId);
    if (!job) return { status: 404, message: "Job not found" };

    if (
      user.role !== "employer" &&
      job.createdBy._id.toString() !== user._id.toString()
    ) {
      return {
        status: 403,
        message: "You are not allowed to delete this job",
      };
    }

    await JobRepository.delete(jobId);
    return { status: 200, message: "Job deleted successfully" };
  },
};
export default JobService;
