const express = require("express");

const userController = require("./../controller/UserController");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/addLibrarian", userController.addLibrerian);
router.get("/getprofile", userController.getProfile);
module.exports = router;
