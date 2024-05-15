import { Router } from "express";
const router = Router();

import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductCountByCategory,
} from "../controllers/productController.js";
import { authenticateUser } from "../middleware/authentication.js";

router
  .route("/api/v1/products/")
  .post(authenticateUser, createProduct)
  .get(authenticateUser, getProducts);
router
  .route("/api/v1/products/category")
  .get(authenticateUser, getProductCountByCategory);
router
  .route("/api/v1/products/:id")
  .get(authenticateUser, getProductById)
  .delete(authenticateUser, deleteProduct)
  .patch(authenticateUser, updateProduct);

export default router;
