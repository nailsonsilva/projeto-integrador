import { Router } from "express";
const router = Router();

import {
  getMovements,
  getTotalQuantityByTypeAndMonth,
  getMovementsDetails,
} from "../controllers/movementController.js";
import { authenticateUser } from "../middleware/authentication.js";

router.route("/api/v1/movements/").get(authenticateUser, getMovements);
router
  .route("/api/v1/movements/status")
  .get(authenticateUser, getTotalQuantityByTypeAndMonth);
router
  .route("/api/v1/movements/orders")
  .get(authenticateUser, getMovementsDetails);

export default router;
