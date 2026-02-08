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
 // users.push(data);
  //create a record in db using data
  //return created user