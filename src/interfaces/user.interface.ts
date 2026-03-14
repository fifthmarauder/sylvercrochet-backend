import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  name: string;
  images: string;
  stock?: boolean;
  isFeatured?: boolean;
  category: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  productId: string;
  name: string;
  images: string;
  category: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerInfo: {
    fullName: string;
    email: string;
    contactNo: string;
  };
  shippingAddress: {
    streetAddress: string;
    city: string;
    zipCode: string;
  };
  items: IOrderItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  modifications?: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomOrder extends Document {
  orderNumber: string;
  customerInfo: {
    fullName: string;
    email: string;
    contactNo: string;
  };
  shippingAddress: {
    streetAddress: string;
    city: string;
    zipCode: string;
  };
  referenceImages: string[];
  description: string;
  status:
    | "pending"
    | "quoted"
    | "approved"
    | "in-progress"
    | "completed"
    | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
