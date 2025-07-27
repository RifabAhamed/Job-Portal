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

  async setNewPasswordController(req, res) {
    const { token, newPassword } = req.body;
    const response = await UserService.setNewPassword({ token, newPassword });
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
}

export default UserController;
