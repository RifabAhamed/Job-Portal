import CompanyRepository from "../repositories/CompanyRepository.js";
import JobRepository from "../repositories/JobRepository.js";
import UserRepository from "../repositories/UserRepository.js";

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

  async getAllJobsPaginated(params) {
    const { page, limit, search, sort } = params;

    // --- BUILD THE DATABASE QUERY ---
    const query = {};

    // 1. Search Logic
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        // Note: Searching "company.name" requires the Repository to use Aggregate/Lookup
        // if the company field is just an ObjectId in the Job Schema.
        // If your Job schema saves companyName as a string, this works fine.
        { "company.name": { $regex: search, $options: "i" } },
      ];
    }

    // 2. Exact & Regex Filters
    if (params.location) {
      query.location = { $regex: params.location, $options: "i" };
    }

    if (params.jobType) {
      const types = params.jobType.split(",");
      if (types.length > 0) query.jobType = { $in: types };
    }

    if (params.experienceLevel) {
      const levels = params.experienceLevel.split(",");
      if (levels.length > 0) query.experienceLevel = { $in: levels };
    }

    // 3. Salary Range
    if (params.minSalary || params.maxSalary) {
      query.salary = {};
      if (params.minSalary) query.salary.$gte = Number(params.minSalary);
      if (params.maxSalary) query.salary.$lte = Number(params.maxSalary);
    }

    // --- HANDLE SORTING ---
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "salary_high") sortOption = { salary: -1 };
    if (sort === "salary_low") sortOption = { salary: 1 };

    // Call Repository with standardized signature: (filter, page, limit, sort)
    return await JobRepository.getPaginatedJobs(query, page, limit, sortOption);
  },

  async getCompanyJobsPaginated({
    companyId,
    page = 1,
    limit = 10,
    filter = {},
  }) {
    if (!companyId) {
      return { status: 400, message: "Company id is required" };
    }

    const jobs = await JobRepository.getPaginatedJobs(page, limit, {
      ...filter,
      company: companyId,
    });
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

  async toggleSaveJob(userId, jobId) {
    try {
      const jobExists = await JobRepository.findById(jobId);
      if (!jobExists) {
        return { status: 404, message: "Job not found" };
      }

      const user = await UserRepository.findById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      const isSaved = user.savedJobs.includes(jobId);

      // 👈 Use the repository methods to update the DB
      if (isSaved) {
        await UserRepository.removeSavedJob(userId, jobId);
        return {
          status: 200,
          message: "Job removed from saved list",
          isSaved: false,
        };
      } else {
        await UserRepository.addSavedJob(userId, jobId);
        return {
          status: 200,
          message: "Job saved successfully",
          isSaved: true,
        };
      }
    } catch (error) {
      console.error("Error in toggleSaveJob service:", error);
      throw error;
    }
  },

  async getSavedJobs(userId) {
    try {
      // 👈 Use the new repository method
      const user = await UserRepository.getUserWithPopulatedSavedJobs(userId);

      if (!user) {
        return { status: 404, message: "User not found" };
      }

      return {
        status: 200,
        count: user.savedJobs.length,
        data: user.savedJobs,
      };
    } catch (error) {
      console.error("Error in getSavedJobs service:", error);
      throw error;
    }
  },
};
export default JobService;
