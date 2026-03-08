import express from "express";
import {  addNewProduct, createOrderController, createUser, deleteProductController, getFeaturedProductsController, getProducts, getProductStats, updateProductController, uploadImage } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createNewProductSchema, createOrderSchema, createUserSchema } from "../validators/user.validators";
import { upload } from "../middlewares/upload";



const router = express.Router();

// router.get("/", getUsers);
router.post("/",validate(createUserSchema), createUser);

router.post("/addProduct" , validate(createNewProductSchema), addNewProduct)

router.get("/featured", getFeaturedProductsController);

router.get("/stats",getProductStats)

router.get("/adminProducts",getProducts)

router.put("/updateProduct/:id",validate(createNewProductSchema), updateProductController)

router.delete("/deleteProduct/:id", deleteProductController)

router.post('/create', validate(createOrderSchema), createOrderController);

router.post('/image', upload.single('image'), uploadImage);
export default router;
