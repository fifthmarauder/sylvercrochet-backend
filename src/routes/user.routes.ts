import express from "express";
import {  addNewProduct, createUser, getProductStats } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createNewProductSchema, createUserSchema } from "../validators/user.validators";



const router = express.Router();

// router.get("/", getUsers);
router.post("/",validate(createUserSchema), createUser);

router.post("/addProduct" , validate(createNewProductSchema), addNewProduct)

router.get("/stats",getProductStats)

export default router;
