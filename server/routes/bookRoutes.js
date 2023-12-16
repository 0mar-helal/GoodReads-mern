const { Router } = require("express");
const {
  getBookById,
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
} = require("../contollers/bookController");

const bookRouter = Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/", addBook);

bookRouter.delete("/:id", deleteBook);

bookRouter.put("/:id", updateBook);

module.exports = bookRouter;
