import { Schema, model } from 'mongoose';
import { IProduct, IUser } from '../interfaces/user.interface';


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
    stock: { type: Number, required: false },
    description:{type:String, required:true},
    price:{type:Number, required:true}
  },
  { timestamps: true }
)

export const UserModel = model<IUser>('User', userSchema);
export const NewProductModel = model<IProduct>('NewProduct', newProductSchema)