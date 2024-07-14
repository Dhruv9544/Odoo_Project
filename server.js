const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//dbconnection
require("./config/dbconfig").getDbconnection();
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
