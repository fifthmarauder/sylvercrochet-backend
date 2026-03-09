import {
  addANewProduct,
  createAUser,
  createCustomOrder,
  createOrder,
  deleteProduct,
  editProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductStatistics,
} from "../services/user.service";
import { Request, Response } from "express";
import {
  sendCustomOrderEmailToAdmin,
  sendOrderEmailToAdmin,
} from "../utils/emailService";
import cloudinary from "../config/cloudinary";

// export const getUsers = async (req, res) => {
//   const users = await userService.getAllUsers();
//   res.json(users);
// };

export const createUser = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    // } catch (error) {
    //   res.status(500).json({ message: "Failed to create product" });
    //   res.status(400).json(error);
    // }
    console.error("Product creation error:", error);
    res.status(400).json({
      message: error.message || "Failed to create product",
      error: error.errors || error,
    });
  }
};

export const getProductStats = async (req: Request, res: Response) => {
  try {
    const stats = await getProductStatistics();
    res.status(200).json(stats);
  } catch (error: any) {
    console.error("Stats fetch error:", error);
    res.status(500).json({
      message: error.message || "Failed to fetch statistics",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    console.error("Products not fetched", error);
    res.status(500).json({
      message: error.message || "Failed to fetch products",
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = await editProduct(id, req.body);
    res.status(200).json(update);
  } catch (error: any) {
    console.error("Product not updated", error);
    res.status(500).json({
      message: error.message || "Failed to update products",
    });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.log("Product not deleted", error);
    res.status(500).json({
      message: error.message || "Failed to delete product",
    });
  }
};

export const getFeaturedProductsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const featured = await getFeaturedProducts();
    res.status(200).json(featured);
  } catch (error: any) {
    console.log("Cannot get Featured Products", error);
    res.status(500).json({
      message: error.message || "Failed to fetch Products",
    });
  }
};
export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);

    try {
      await sendOrderEmailToAdmin({
        orderNumber: order.orderNumber,
        customerInfo: order.customerInfo,
        shippingAddress: order.shippingAddress,
        items: order.items,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        totalAmount: order.totalAmount,
        modifications: order.modifications,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
      },
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

export const createCustomOrderController = async (
  req: Request,
  res: Response,
) => {
  try {
    const order = await createCustomOrder(req.body);
    try {
      await sendCustomOrderEmailToAdmin({
        orderNumber: order.orderNumber,
        customerInfo: order.customerInfo,
        shippingAddress: order.shippingAddress,
        description: order.description,
        referenceImages: order.referenceImages,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        orderNumber: order.orderNumber,
      },
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 800, height: 800, crop: "limit" }],
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
