import { IProduct, IUser } from "../interfaces/user.interface";
import { NewProductModel, UserModel } from "../models/user.model";
// export const getAllUsers = async () => {
//   return users;
// };

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