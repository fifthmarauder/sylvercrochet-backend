import { IProduct, IUser } from "../interfaces/user.interface";
import { NewProductModel, UserModel } from "../models/user.model";

export const createAUser = async (data:IUser) => {
 
  const user = await UserModel.create(data);
  return user;
};

export const addANewProduct = async(data:IProduct) =>{
  const product = await NewProductModel.create(data);
  return product;
}

export const getProductStatistics =async()=>{
  try {
    const  totalProducts = await NewProductModel.countDocuments()
    const totalStock = await NewProductModel.countDocuments({stock : true})
    const inventoryResult = await NewProductModel.aggregate([
      {
        $group:{
          _id:null,
          totalValue : {$sum:"$price"}
        }
      }
    ])
    const inventoryValue = inventoryResult[0]?.totalValue || 0

    return{
      totalProducts,
      totalStock,
      inventoryValue

    }
  } catch (error) {
    throw error
  }
}

export const getAllProducts =async()=>{
  try {
    const products = await NewProductModel.find().sort({createdAt:-1})
    return products
  } catch (error) {
    throw error
  }
}

export const editProduct =async(id:string, data:Partial<IProduct>)=>{
  try {
    const updateProduct = await NewProductModel.findByIdAndUpdate(id,data,{new:true, runValidators:true})
    if(!updateProduct){
      throw new Error("Product not found")
    }

    return updateProduct
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async(id:string)=>{
  try {
    const deleteProduct = await NewProductModel.findByIdAndDelete(id)
    if(!deleteProduct){
      throw new Error("Product not found")
    }

    return deleteProduct
  } catch (error) {
    throw error
  }
}