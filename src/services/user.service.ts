import { getShippingCost } from "../constants/cities";
import { IOrder, IProduct, IUser } from "../interfaces/user.interface";
import { NewProductModel, OrderModel, UserModel } from "../models/user.model";


export const createAUser = async (data:IUser) => {
 
  const user = await UserModel.create(data);
  return user;
};

export const addANewProduct = async(data:IProduct) =>{
   if (data.isFeatured === true) {
    const featuredCount = await NewProductModel.countDocuments({ isFeatured: true });
    
    if (featuredCount >= 3) {
      throw new Error("Maximum 3 products can be featured. Please unfeature another product first.");
    }
  }
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

    if (data.isFeatured === true) {
      const featuredCount = await NewProductModel.countDocuments({ 
        isFeatured: true,
        _id: { $ne: id }  
      });
      
      if (featuredCount >= 3) {
        throw new Error("Maximum 3 products can be featured. Please unfeature another product first.");
      }
    }

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

export const getFeaturedProducts =async()=>{
  try {
    const getProducts = await NewProductModel.find({isFeatured:"true"}).limit(3).sort({createdAt:-1})
    return getProducts
  } catch (error) {
    throw error
  }
}

type CreateOrderData = Omit<IOrder, '_id' | 'orderNumber' | 'shippingCost' | 'totalAmount' | 'status' | 'createdAt' | 'updatedAt'>;

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};


export const createOrder =async(data:CreateOrderData)=>{
  try {
    const shippingCost = getShippingCost(data.shippingAddress.city)
    const totalAmount =data.subtotal + shippingCost
    const orderNumber = generateOrderNumber();

    const order = await OrderModel.create({
      orderNumber,
      customerInfo:data.customerInfo,
       shippingAddress: data.shippingAddress,
      items: data.items,
      subtotal: data.subtotal,
      shippingCost,
      totalAmount,
      modifications: data.modifications || '',
      status: 'pending',
    })
    return order
  
  } catch (error) {
    throw error
  }
}

