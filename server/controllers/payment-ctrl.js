import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK);

// make payment
export const processPayment = async (req, res) => {
  try {
    const stripePay = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
    });
    res.status(200).send({ stripePay, client_secret: stripePay.client_secret });
  } catch (error) {
    console.log(error);
  }
};

// get stripe publishable key in frontend
export const getStripePK = async (req, res) => {
  try {
    res.status(200).send({ stripePK: process.env.STRIPE_PK });
  } catch (error) {
    console.log(error);
  }
};
