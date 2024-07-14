const userModel = require("../model/usermodel");

module.exports.getLibrary = catchAsync(async (req, res, next) => {
  try {
    const library = await userModel.find({ role: "Librarian" });
    res.status(200).json({ libraries: library });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
