const bookModel = require("../model/bookmodel");
const catchAsync = require("../utils/catchAsync");

module.exports.addBook = catchAsync(async (req, res, next) => {
  const newBook = new bookModel(req.body);

  const book = await newBook.save();
  res.status(200).json({ book });
});

module.exports.getBooks = catchAsync(async (req, res, next) => {
  const bookings = await bookModel.find(req.query);
  res.json(bookings);
});

module.exports.searchBook = catchAsync(async (req, res, next) => {
  try {
    const { title, author, genre } = req.query;
    const searchCriteria = {};

    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" };
    }
    if (author) {
      searchCriteria.author = { $regex: author, $options: "i" };
    }
    if (genre) {
      searchCriteria.genre = { $regex: genre, $options: "i" };
    }

    const books = await bookModel.find(searchCriteria);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
