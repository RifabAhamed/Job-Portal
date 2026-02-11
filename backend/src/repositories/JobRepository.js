import JobModel from "../models/JobModel.js";

const JobRepository = {
  async create(jobData) {
    return await JobModel.create(jobData);
  },

  async findById(id) {
    return await JobModel.findById(id)
      .populate("company", "name location industry")
      .populate("createdBy", "name email");
  },

   /**
   * Industry Standard Pagination
   * @param {Object} filter - The MongoDB query object
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @param {Object} sort - Sort object (e.g., { createdAt: -1 })
   */
  async getPaginatedJobs(filter, page, limit, sort) {
    const skip = (page - 1) * limit;

    // 1. Run Count and Find in Parallel for performance
    const [jobs, total] = await Promise.all([
      JobModel.find(filter)
        .populate("company", "name location industry logo")
        .populate("createdBy", "name email")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .lean(), // optimization: faster read

      JobModel.countDocuments(filter),
    ]);

    // 2. Return standard pagination response
    return {
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  },
  
  async update(id, updateData) {
    return await JobModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id) {
    return await JobModel.findOneAndDelete(id);
  },
};

export default JobRepository;
