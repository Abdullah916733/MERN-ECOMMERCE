import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendStripeApiKey = async (req, res, nex) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};
