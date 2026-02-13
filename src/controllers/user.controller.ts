import {  addANewProduct, createAUser } from "../services/user.service";
import { Request, Response } from "express";

// export const getUsers = async (req, res) => {
//   const users = await userService.getAllUsers();
//   res.json(users);
// };

export const createUser = async (req :Request, res : Response) => {

  const user = await createAUser(req.body);

  res.status(201).json(user);
};

// export const addNewProduct = async (req:Request, res:Response) =>{
//   const {data}=req.body;
//   const newProduct = await addANewProduct(data);

//   res.status(201).json(newProduct)
// }

export const addNewProduct = async (req: Request, res: Response) => {
 
  try {
    const newProduct = await addANewProduct(req.body);
    res.status(201).json(newProduct);
  }
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to create product" });
  //   res.status(400).json(error);
  // }
  catch (error: any) {
    console.error("Product creation error:", error);
    res.status(400).json({ 
      message: error.message || "Failed to create product",
      error: error.errors || error 
    });
  }
};
