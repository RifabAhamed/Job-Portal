import UserModel from "../models/UserModel.js";

const UserRepository = {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  },

  async findById(id) {
    return await UserModel.findById(id);
  },

  async findByInviteToken(token) {
    return await UserModel.findOne({ inviteToken: token });
  },

  async create(userData) {
    return await UserModel.create(userData);
  },

  async getPaginatedUsers(page, limit) {
    const skip = (page - 1) * limit;
    const users = await UserModel.find().skip(skip).limit(Number(limit));
    const total = await UserModel.countDocuments();
    return {
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  async updateUserRole(userId, role) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { role: role },
      { new: true },
    );
  },
  async getUserWithPopulatedSavedJobs(userId) {
    return await UserModel.findById(userId).populate({
      path: "savedJobs",
      select:
        "title company location salaryRange jobType experienceLevel createdAt",
    });
  },

  async addSavedJob(userId, jobId) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { savedJobs: jobId } },
      { new: true }, // Returns the updated document
    );
  },

  async removeSavedJob(userId, jobId) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { savedJobs: jobId } },
      { new: true },
    );
  },
};

export default UserRepository;
