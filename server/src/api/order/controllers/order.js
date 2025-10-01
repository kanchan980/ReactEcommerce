"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { products, userName, email, billingAddress, shippingAddress, totalPrice } =
        ctx.request.body.data || ctx.request.body;

      if (!products || !products.length) return ctx.badRequest("Products are required");
      if (!email) return ctx.badRequest("Email is required");

      // Fetch all products from DB
      const productDataList = await Promise.all(
        products.map(async (p) => ({
          id: p.id,
          data: await strapi.db.query("api::product.product").findOne({ where: { id: p.id } }),
        }))
      );

      // Check for missing products
      const missingProducts = productDataList.filter(p => !p.data).map(p => p.id);
      if (missingProducts.length) return ctx.badRequest(`Products not found: ${missingProducts.join(", ")}`);

      // Build Stripe line items
    const lineItems = productDataList.map(({ data }, idx) => {
  const quantity = Number(products[idx].count || 1);
  const price = Number(data.price);

  if (isNaN(price)) {
    throw new Error(`Invalid price for product "${data.name}"`);
  }

  return {
    price_data: {
      currency: "usd",
      product_data: { name: data.name },
      unit_amount: Math.round(price * 100),
    },
    quantity,
  };
});

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });

      // Save order in Strapi
      const order = await strapi.service("api::order.order").create({
        data: {
          userName,
          email,
          billingAddress,
          shippingAddress,
          products,
          totalPrice,
          stripeSessionId: session.id,
        },
      });

      return { data: order, stripeSessionId: session.id };

    } catch (error) {
      console.error("Order create error:", error);
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the order", details: error.message } };
    }
  },
}));
