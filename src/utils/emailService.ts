import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface OrderEmailData {
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
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  modifications?: string;
}

export const sendOrderEmailToAdmin = async (orderData: OrderEmailData) => {
  const itemsList = orderData.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Rs. ${item.price}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Rs. ${item.price * item.quantity}</td>
        </tr>`,
    )
    .join("");

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e91e63; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; color: #e91e63; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #e91e63; color: white; padding: 10px; text-align: left; }
        td { padding: 8px; }
        .total-row { font-weight: bold; background-color: #fff; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Order Received!</h1>
          <p>Order #${orderData.orderNumber}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Customer Information</div>
            <p><strong>Name:</strong> ${orderData.customerInfo.fullName}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>Contact:</strong> ${orderData.customerInfo.contactNo}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Shipping Address</div>
            <p>${orderData.shippingAddress.streetAddress}</p>
            <p>${orderData.shippingAddress.city}, ${orderData.shippingAddress.zipCode}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Order Items</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right; padding: 10px;">Subtotal:</td>
                  <td style="padding: 10px;">Rs. ${orderData.subtotal}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3" style="text-align: right; padding: 10px;">Shipping (${orderData.shippingAddress.city}):</td>
                  <td style="padding: 10px;">Rs. ${orderData.shippingCost}</td>
                </tr>
                <tr class="total-row" style="background-color: #e91e63; color: white;">
                  <td colspan="3" style="text-align: right; padding: 10px;">Total Amount:</td>
                  <td style="padding: 10px;">Rs. ${orderData.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          ${
            orderData.modifications
              ? `
          <div class="section">
            <div class="section-title">Special Instructions</div>
            <p>${orderData.modifications}</p>
          </div>
          `
              : ""
          }
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Your admin email
    subject: `New Order: ${orderData.orderNumber}`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
};

export const sendCustomOrderEmailToAdmin = async (orderData: any) => {
  const imagesList = orderData.referenceImages
    .map(
      (url: string) =>
        `<img src="${url}" style="width: 200px; height: 200px; object-fit: cover; margin: 10px; border-radius: 8px; border: 2px solid #e91e63;" />`,
    )
    .join("");

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #e91e63; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; color: #e91e63; margin-bottom: 10px; font-size: 18px; }
        .description-box { 
          background: white; 
          padding: 15px; 
          border-radius: 8px; 
          border-left: 4px solid #e91e63;
          margin: 10px 0;
        }
        .images-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Custom Order Request!</h1>
          <p>Order #${orderData.orderNumber}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Customer Information</div>
            <p><strong>Name:</strong> ${orderData.customerInfo.fullName}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>Contact:</strong> ${orderData.customerInfo.contactNo}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Shipping Address</div>
            <p>${orderData.shippingAddress.streetAddress}</p>
            <p>${orderData.shippingAddress.city}, ${orderData.shippingAddress.zipCode}</p>
          </div>
          
          <div class="section">
            <div class="section-title">What They Want</div>
            <div class="description-box">
              ${orderData.description.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Reference Images</div>
            <div class="images-grid">
              ${imagesList}
            </div>
          </div>
          
          <div class="section" style="margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 8px;">
            <p style="margin: 0; color: #856404;">
              <strong>Next Step:</strong> Review this request and send a price quote to the customer via email.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Custom Order Request: ${orderData.orderNumber}`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
};
