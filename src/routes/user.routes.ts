import express from "express";
import {  addNewProduct, createUser, deleteProductController, getProducts, getProductStats, updateProductController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createNewProductSchema, createUserSchema } from "../validators/user.validators";



const router = express.Router();

// router.get("/", getUsers);
router.post("/",validate(createUserSchema), createUser);

router.post("/addProduct" , validate(createNewProductSchema), addNewProduct)

router.get("/stats",getProductStats)

router.get("/adminProducts",getProducts)

router.put("/updateProduct/:id",validate(createNewProductSchema), updateProductController)

router.delete("/deleteProduct/:id", deleteProductController)
export default router;
