import Joi from "joi";

// Login validation
export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Register validation
export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("jobseeker", "employer", "admin").required(),
});

// Pagination (for getAllUsers)
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});


export const inviteUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid("employer").required(), // Only employer can be invited
});

