import express from "express";
import {  addNewProduct, createUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createNewProductSchema, createUserSchema } from "../validators/user.validators";


const router = express.Router();

// router.get("/", getUsers);
router.post("/",validate(createUserSchema), createUser);

router.post("/addProduct" , validate(createNewProductSchema), addNewProduct)

export default router;
