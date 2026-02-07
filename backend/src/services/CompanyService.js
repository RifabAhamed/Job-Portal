import CompanyRepository from "../repositories/CompanyRepository.js";

const CompanyService = {
  async createCompany(user, companyData) {
    if (user.role !== "employer") {
      return {
        status: 403,
        message: "Only employers can create companies",
      };
    }

    const company = await CompanyRepository.create({
      ...companyData,
      createdBy: user._id,
    });

    return {
      status: 201,
      message: "Company created successfully",
      data: company,
    };
  },

  async getCompanyById(id) {
    const company = await CompanyRepository.findById(id);
    if (!company) {
      return { status: 404, message: "Company not found" };
    }

    return { status: 200, data: company };
  },

  async getAllCompaniesPaginated({ page = 1, limit = 10, filter = {} }) {
    const companies = await CompanyRepository.getPaginatedCompanies(
      page,
      limit,
      filter,
    );
    return { status: 200, data: companies };
  },

  async updateCompany(user, companyId, updateData) {
    const company = await CompanyRepository.findById(companyId);
    if (!company) {
      return { status: 404, message: "Company not found" };
    }

    if (
      user.role !== "employer" &&
      company.createdBy._id.toString() !== user._id.toString()
    ) {
      return {
        statues: 403,
        message: "You are not allowed to update this company",
      };
    }

    const updatedCompany = await CompanyRepository.update(
      companyId,
      updateData,
    );
    return {
      status: 200,
      message: "Company updated successfully",
      data: updatedCompany,
    };
  },

  async deleteCompany(user, companyId) {
    const company = await CompanyRepository.findById(companyId);
    if (!company) return { status: 404, message: "Company not found" };

    if (
      user.role !== "admin" &&
      company.createdBy._id.toString() !== user._id.toString()
    ) {
      return {
        status: 403,
        message: "You are not allowed to delete this company",
      };
    }

    await CompanyRepository.delete(companyId);
    return { status: 200, message: "Company deleted successfully" };
  },

  async getEmployerCompaniesPaginated(user, { page = 1, limit = 10 }) {
    if (!user || !user._id) {
      return {
        status: 401,
        message: "User not authenticated",
      };
    }

    // Filter companies by createdBy (the employer's ID)
    const companies = await CompanyRepository.getPaginatedCompanies(
      page,
      limit,
      { createdBy: user._id },
    );

    return {
      status: 200,
      message: "Employer companies retrieved successfully",
      data: companies,
    };
  },
};
export default CompanyService;