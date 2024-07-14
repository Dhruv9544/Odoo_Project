const express = require("express");

const BookController = require("./../controller/BookController");
const router = express.Router();

router.post("/addBook", BookController.addBook);
router.get("/getBook", BookController.getBooks);
router.get("/searchBook", BookController.searchBook);

module.exports = router;
