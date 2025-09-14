import JobApplicationModel from "../models/JobApplicationModel.js";

const JobApplicationRepository = {
  async create(applicationData) {
    return await JobApplicationModel.create(applicationData);
  },

  async findById(id) {
    return await JobApplicationModel.findById(id)
      .populate("job", "title position location type")
      .populate("applicant", "name email")
      .populate("job.company", "name location industry");
  },

  async findByApplicant(applicantId, page = 1, limit = 10){
    const skip = (page -1)*limit;
    const applications = await JobApplicationModel.find({
      applicant: applicantId,
    }).populate("job", "title position location type").skip(skip).limit(Number(limit));

    const total = await JobApplicationModel.countDocuments({applicant:applicantId});

    return {
        applications,
        total,
        page: Number(page),
        pages:Math.ceil(total/limit)
    }
  },

  async findByJob(jobId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const applications = await JobApplicationModel.find({ job: jobId })
      .populate("applicant", "name email")
      .skip(skip)
      .limit(Number(limit));

    const total = await JobApplicationModel.countDocuments({ job: jobId });

    return {
      applications,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  async updateStatus(id, status, notes) {
    return await JobApplicationModel.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    )
      .populate("job", "title position")
      .populate("applicant", "name email");
  },

  async delete(id) {
    return await JobApplicationModel.findByIdAndDelete(id);
  },
};

export default JobApplicationRepository;
