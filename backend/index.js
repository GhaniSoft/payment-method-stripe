const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51Njbr5F88g5WT6iJO03WeVxwlWEobjnfuOY5wGqMc2a3n0X9K4J77i7DhHdXHnLmwWchQ9ohOEgEu8biCFwnbuAp00t1PG5syB"
); // Replace with your actual secret key

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
    try {
      const { paymentMethodId, amount, currency } = req.body;
  
      // Create a Payment Intent with attached payment method
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId, // Attach payment method directly to Payment Intent
        payment_method_types: ["card"], // Specify the payment method types you support
        confirm: true, // Confirm the Payment Intent immediately
        return_url: "https://your-website.com/return-url", // Replace with your actual return URL
      });
    //   console.log("Payment Intent created:", paymentIntent);
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
