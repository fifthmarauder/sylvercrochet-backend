import { Schema, model } from 'mongoose';
import { ICustomOrder, IOrder, IProduct, IUser } from '../interfaces/user.interface';


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin:{type:Boolean, default:false}
  },
  { timestamps: true }
);

const newProductSchema = new Schema<IProduct>(
  {
    name:{type:String, required:true},
    images:{type:String , required:true},
    category:{type:String, required:true},
    stock: { type: Boolean, required: false },
    isFeatured: {type: Boolean, default: false},
    description:{type:String, required:true},
    price:{type:Number, required:true}
  },
  { timestamps: true }
)

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    customerInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      contactNo: { type: String, required: true },
    },
    shippingAddress: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        images: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    modifications: { type: String, required: false },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending' 
    },
  },
  { timestamps: true }
);

const customOrderSchema = new Schema<ICustomOrder>(
  {
    orderNumber:{type:String, required:true, unique:true},
    customerInfo:{
      fullName:{type:String, required:true},
      email:{type:String, required:true},
      contactNo:{type:String, required:true}
    },
     shippingAddress: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    description:{type:String,required:true},
    referenceImages:[{type:String, required:true}],
    status: { 
      type: String, 
      enum: ['pending', 'quoted', 'approved', 'in-progress', 'completed', 'cancelled'],
      default: 'pending' 
    },
  },
  {timestamps:true}
)

export const OrderModel = model<IOrder>('Order', orderSchema);
export const UserModel = model<IUser>('User', userSchema);
export const NewProductModel = model<IProduct>('NewProduct', newProductSchema)
export const CustomOrderModel =model<ICustomOrder>('CustomOrder',customOrderSchema)