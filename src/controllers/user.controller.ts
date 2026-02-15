import {  addANewProduct, createAUser, getAllProducts, getProductStatistics } from "../services/user.service";
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

export const getProductStats =async(req: Request, res: Response)=>{
  try {
    const stats = await getProductStatistics();
    res.status(200).json(stats)
  } catch (error:any) {
     console.error("Stats fetch error:", error);
    res.status(500).json({ 
      message: error.message || "Failed to fetch statistics"
    });
  }
}

export const getProducts =async(req:Request, res:Response)=>{
  try {
    const products = await getAllProducts();
    res.status(200).json(products)
  } catch (error:any) {
    console.error("Products not fetched", error)
    res.status(500).json({
      message:error.message || "Failed to fetch products"
    })
  }
}