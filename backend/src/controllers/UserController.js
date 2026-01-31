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

  async inviteEmployerController(req, res) {
    const response = await UserService.inviteEmployer(req.user, req.body);
    res.status(response.status).json(response);
  }

  async acceptInviteController(req, res) {
    const response = await UserService.acceptInvite(req.body);
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

  //superbase
  // async updateResumeController(req, res) {
  //     try {
  //       const userId = req.user.id;
  //       const { resume } = req.body;

  //       if (!resume) {
  //         return res.status(400).json({ message: "Resume path is required" });
  //       }

  //       const response = await UserService.updateResume(userId, resume);

  //       res.status(response.status).json(response);
  //     } catch (error) {
  //       console.error("Error in updateResumeController:", error);
  //       res.status(500).json({ message: "Internal Server Error" });
  //     }
  //   }

  // async uploadResumeController(req, res) {
  //    return this.updateResumeController(req, res);
  // }

  // async viewResumeController(req, res) {
  //   try {
  //     const userId = req.user.id;
  //     const response = await UserService.viewResume(userId);
  //     res.status(response.status).json(response);
  //   } catch (error) {
  //     console.error("Error in viewResumeController:", error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }

  async deleteResumeController(req, res) {
    try {
      const response = await UserService.deleteResume(req.user.id);
      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in deleteResumeController:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Debug helper: compute the signature for Cloudinary string to sign
  async cloudinaryDebugController(req, res) {
    try {
      const { public_id, timestamp } = req.query;

      // Basic info (non-secret) to confirm what the server is using
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || null;
      const apiKey = process.env.CLOUDINARY_API_KEY || null;

      if (!public_id || !timestamp) {
        return res.status(200).json({
          status: 200,
          data: { cloudName, apiKey },
          message:
            "Provide 'public_id' and 'timestamp' query params to compute signature",
        });
      }

      const stringToSign = `public_id=${public_id}&timestamp=${timestamp}`;

      const crypto = await import("crypto");
      const apiSecret = process.env.CLOUDINARY_API_SECRET;
      if (!apiSecret) {
        return res.status(500).json({
          status: 500,
          message:
            "CLOUDINARY_API_SECRET is not set on the server. Cannot compute signature.",
        });
      }

      const signature = crypto
        .createHash("sha1")
        .update(stringToSign + apiSecret)
        .digest("hex");

      return res.status(200).json({
        status: 200,
        data: { cloudName, apiKey, stringToSign, signature },
      });
    } catch (err) {
      console.error("Error in cloudinaryDebugController:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async uploadResumeController(req, res) {
    try {
      const userId = req.user.id;
      const file = req.file;

      const response = await UserService.uploadResume(userId, file);

      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in uploadResumeController:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async viewResumeController(req, res) {
    try {
      const userId = req.user.id;
      const response = await UserService.viewResume(userId);
      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in viewResumeController:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateResumeController(req, res) {
    const file = req.file;
    const response = await UserService.updateResume(req.user.id, file);
    res.status(response.status).json(response);
  }

  async deleteResumeController(req, res) {
    const response = await UserService.deleteResume(req.user.id);
    res.status(response.status).json(response);
  }
}

export default UserController;
