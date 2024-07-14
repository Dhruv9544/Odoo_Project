const cron = require("node-cron");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const nodemailer = require("nodemailer");
const paymentModel = require("./model/paymentmodel");

//dbconnection
require("./config/dbconfig").getDbconnection();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Set up express
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/auth", userRoutes);
app.use("", bookRoutes);
app.use("/library", libraryRoutes);
app.use("/payment", paymentRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 9999;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "udayg3690@gmail.com",
    pass: "guxdkkvajdtynfgf",
  },
});

const sendReminderEmail = (email, bookTitle, endDate) => {
  const mailOptions = {
    from: "udayg3690@gmail.com",
    to: email,
    subject: "Reminder: Book Rental End Date Approaching",
    text: `Dear User,

Your rental for the book "${bookTitle}" is ending soon. The end date is ${endDate}. Please take the necessary actions.

Thank you,
Your Library Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

async function reminder() {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const payments = await paymentModel
      .find({
        endDate: {
          $lte: new Date(
            tomorrow.getTime() + 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      })
      .populate("user")
      .populate("book");

    console.log("Payments found:", payments);

    payments.forEach((payment) => {
      sendReminderEmail(
        payment.user.email,
        payment.book.title,
        payment.endDate
      );
    });
  } catch (error) {
    console.error("Error in reminder function:", error);
  }
}

cron.schedule("0 0 * * *", async function () {
  console.log("Cron job started");
  await reminder();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
