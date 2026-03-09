import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  admin: Joi.boolean().optional()
});

export const createNewProductSchema = Joi.object({
  name:Joi.string().required(),
  images: Joi.string().required(),
  stock: Joi.boolean().default(true),
  category: Joi.string().required(),
  description:Joi.string().min(5).max(200).required(),
  price: Joi.number().positive().required(),
  isFeatured: Joi.boolean().optional()

})

export const createOrderSchema = Joi.object({
  customerInfo: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string()
      .pattern(/^(\+92|92|0)?3[0-9]{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Please enter a valid Pakistani phone number (e.g., 03XX-XXXXXXX)'
      }),
  }).required(),

  shippingAddress: Joi.object({
    streetAddress: Joi.string().min(5).max(200).required(),
    city: Joi.string().required(),
    zipCode: Joi.string().min(5).max(10).required(),
  }).required(),

  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        name: Joi.string().required(),
        images: Joi.string().uri().required(),
        category: Joi.string().required(),
        price: Joi.number().positive().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'Order must contain at least one item'
    }),

  subtotal: Joi.number().positive().required(),

  modifications: Joi.string().max(500).allow('').optional(),
});

export const createCustomOrderSchema = Joi.object({
  customerInfo: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string()
      .pattern(/^(\+92|92|0)?3[0-9]{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Please enter a valid Pakistani phone number (e.g., 03XX-XXXXXXX)'
      }),
  }).required(),

  shippingAddress: Joi.object({
    streetAddress: Joi.string().min(5).max(200).required(),
    city: Joi.string().required(),
    zipCode: Joi.string().min(5).max(10).required(),
  }).required(),

  description: Joi.string().min(20).max(2000).required()
    .messages({
      'string.min': 'Please provide a detailed description (at least 20 characters)'
    }),

    referenceImages: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(5)
    .required()
    .messages({
      'array.min': 'Please upload at least one reference image',
      'array.max': 'Maximum 5 images allowed'
    }),
});