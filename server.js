const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//dbconnection
require("./config/dbconfig").getDbconnection();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/auth", userRoutes);
app.use("", bookRoutes);
app.use("/library", libraryRoutes);
app.use("/payments", paymentRoutes);
const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
