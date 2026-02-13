import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt:Date;
  admin:boolean
}

export interface IProduct{
  name:string;
  images:string;
  stock?:number;
  category:string;
  description:string;
  price:number;
  createdAt: Date;
  updatedAt:Date;

}
