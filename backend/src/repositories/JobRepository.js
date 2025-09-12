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

  async getPaginatedJobs(page, limit, filter = {}) {
    const skip = (page - 1) * limit;
    const jobs = await JobModel.find(filter)
      .populate("company", "name location industry")
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(Number(limit));

    const total = await JobModel.countDocuments(filter);

    return {
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  async update(id, updateData) {
    return await JobModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  },

  async delete(id){
    return await JobModel.findOneAndDelete(id);
  }
};

export default JobRepository;
