import UserService from "../services/UserService.js";

class UserController {
  async loginController(req, res) {
    const response = await UserService.login(req.body);
    res.status(response.status).json(response);
  }

  async logoutController(req, res) {
    const response = await UserService.logout(req.user);
    res.status(response.status).json(response);
  }

  async resetPasswordController(req, res) {
    const response = await UserService.resetPassword(req.body);
    res.status(response.status).json(response);
  }


  async submitNewPasswordController(req, res) {
    const { token, newPassword } = req.body;
    const response = await UserService.submitNewPassword({
      token,
      newPassword,
    });
    res.status(response.status).json(response);
  }

  async updatePasswordController(req, res) {
    const response = await UserService.updatePassword(req.user, req.body);
    res.status(response.status).json(response);
  }

  async getUserByIdController(req, res) {
    const response = await UserService.getUserById(req.user.id);
    res.status(response.status).json(response);
  }

  async getAllUsersPaginatedController(req, res) {
    const response = await UserService.getAllUsersPaginated(req.query);
    res.status(response.status).json(response);
  }

  async registerUserController(req, res) {
    const response = await UserService.registerUser(req.body);
    res.status(response.status).json(response);
  }

  async updateUserRoleController(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["employer", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const response = await UserService.updateUserRole(id, role);
    res.status(response.status).json(response);
  }
}

export default UserController;
