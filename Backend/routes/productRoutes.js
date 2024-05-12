import { Router } from "express";
const router = Router();

import { createProduct, getProductById, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authenticateUser } from "../middleware/authentication.js";

router
  .route("/")
  .post(authenticateUser, createProduct)
  .get(authenticateUser, getProducts);
router
  .route("/:id")
  .get(authenticateUser, getProductById)
  .delete(authenticateUser, deleteProduct)
  .patch(authenticateUser, updateProduct);

export default router;
