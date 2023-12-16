const { Book } = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  const genre = req.query.genre || "";
  const p = req.query.p || null;
  const booksPerPage = 5;
  // const filter = { geners: { $elemMatch: { $eq: genre } } };
  try {
    let query = Book.find().sort({ title: 1 });
    if (p !== null) {
      query = query.skip(booksPerPage * p).limit(booksPerPage);
    }
    const books = await query.exec();
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mssge: err });
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    return book
      ? res.status(200).json(book)
      : res.status(404).json({ mssge: "not found" });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const addBook = async (req, res) => {
  const bookToAdd = req.body;
  try {
    const response = await Book.create(bookToAdd);
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.deleteOne({ _id: id });
    return book
      ? res.status(200).json({ mssg: "book has been deleted successfully" })
      : res.status(404).json({ mssge: "not found" });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const book = await Book.updateOne({ _id: id }, updates);
    return book
      ? res.status(200).json({ mssg: "book has been updated successfully" })
      : res.status(404).json({ mssge: "not found" });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  deleteBook,
  updateBook,
};
