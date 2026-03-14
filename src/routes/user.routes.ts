import express from "express";
import {
  addNewProduct,
  createCustomOrderController,
  createOrderController,
  deleteProductController,
  getFeaturedProductsController,
  getProducts,
  getProductStats,
  getUser,
  updateProductController,
  uploadImage,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import {
  createCustomOrderSchema,
  createNewProductSchema,
  createOrderSchema,
  createUserSchema,
} from "../validators/user.validators";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.post("/login", validate(createUserSchema), getUser);

router.post("/addProduct", validate(createNewProductSchema), addNewProduct);

router.get("/featured", getFeaturedProductsController);

router.get("/stats", getProductStats);

router.get("/adminProducts", getProducts);

router.put(
  "/updateProduct/:id",
  validate(createNewProductSchema),
  updateProductController,
);

router.delete("/deleteProduct/:id", deleteProductController);

router.post("/create", validate(createOrderSchema), createOrderController);

router.post(
  "/createCustom",
  validate(createCustomOrderSchema),
  createCustomOrderController,
);

router.post("/image", upload.single("image"), uploadImage);
export default router;
