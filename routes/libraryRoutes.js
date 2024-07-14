const libraryController = require("../controller/LibraryController");
const bookController = require("../controller/BookController");

const multer = require("multer");

const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Destination folder for storing uploaded images temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/addBook", upload.single("image"), bookController.addBook);
router.get("/alllibrary", libraryController.getLibrary);

module.exports = router;
