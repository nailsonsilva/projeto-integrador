import { Router } from "express";
const router = Router();

import {
  getMovements,
  getTotalQuantityByTypeAndMonth,
  getMovementsDetails,
  getMovementsByCurrentUser,
  createOrUpdateMovement,
} from "../controllers/movementController.js";
import { authenticateUser } from "../middleware/authentication.js";

router
  .route("/api/v1/movements/")
  .get(authenticateUser, getMovements)
  .post(authenticateUser, createOrUpdateMovement);
router
  .route("/api/v1/movements/currentUser")
  .get(authenticateUser, getMovementsByCurrentUser);
router
  .route("/api/v1/movements/status")
  .get(authenticateUser, getTotalQuantityByTypeAndMonth);
router
  .route("/api/v1/movements/orders")
  .get(authenticateUser, getMovementsDetails);

export default router;
