import { Router } from "express";
const router = Router();

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authentication.js";

router.route("/api/v1/auth/register").post(register);
router.route("/api/v1/auth/login").post(login);
// apenas usuarios autenticado pelo authenticateUser podem acessar o getCurrentUser
router
  .route("/api/v1/auth/getCurrentUser")
  .get(authenticateUser, getCurrentUser);
router.route("/api/v1/auth/logout").get(logout);

export default router;
