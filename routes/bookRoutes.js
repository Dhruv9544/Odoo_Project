const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const BookController = require("./../controller/BookController");
const router = express.Router();

router.post("/addBook", BookController.addBook);
router.get("/getBook", BookController.getBooks);
router.get("/searchBook", BookController.searchBook);
router.post("/payment", async (req, res) => {
    const { amount, name } = req.body;
    const product = await stripe.products.create({
        name: name,
    });
    if (product) {
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: amount * 100,
            currency: "inr",
        });
        if (price.id) {
            var session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: `${price.id}`,
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url:
                    "http://localhost:3000/payment_success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url: "http://localhost:3000/error",
                customer_email: "demo@gmail.com",
            });
        }
        res.json(session);
    }
});

module.exports = router;
