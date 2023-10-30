import { Router } from "express";
const router = Router();

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authentication.js";

router.route("/register").post(register);
router.route("/login").post(login);
// apenas usuarios autenticado pelo authenticateUser podem acessar o getCurrentUser
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logout").get(logout);

export default router;
