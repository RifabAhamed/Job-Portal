import CompanyModel from "../models/CompanyModel.js";

const CompanyRepository = {
  async create(companyData) {
    return await CompanyModel.create(companyData);
  },

  async findById(id) {
    return await CompanyModel.findById(id).populate("createdBy", "name email");
  },

  async getPaginatedCompanies(page, limit, filter = {}) {
    const skip = (page - 1) * limit;
    const companies = await CompanyModel.find(filter)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(Number(limit));

    const total = await CompanyModel.countDocuments(filter);

    return {
      companies,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  },

  async update(id, updateData) {
    return await CompanyModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runvalidators: true,
    });
  },

  async delete(id) {
    return await CompanyModel.findByIdAndDelete(id);
  },
};

export default CompanyRepository;