const { Book } = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  const p = req.query.p || null;
  const numBooksPerPage = 5;
  try {
    let query = Book.find().sort({ title: 1 });
    if (p) {
      query = query.skip(numBooksPerPage * p).limit(numBooksPerPage);
    }
    const booksPerPage = await query.exec();
    const allBook = await Book.find();
    return res.status(200).json({
      data: booksPerPage,
      currentPage: p ? p : "none",
      dataLimit: p ? numBooksPerPage : "no limit",
      moreData: !!p && allBook.length - numBooksPerPage * (p + 1) > 0,
    });
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
      : res.status(404).json({ mssge: "Not found" });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const getBookBytitle = async (req, res) => {
  const searchWord = req.params.searchWord;
  console.log(searchWord);
  try {
    const book = await Book.find({
      title: { $regex: searchWord, $options: "i" },
    });
    console.log(book);

    return book
      ? res.status(200).json(book)
      : res.status(404).json({ mssge: "Not found" });
  } catch (err) {
    console.log(err);
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
  getBookBytitle,
  addBook,
  deleteBook,
  updateBook,
};
