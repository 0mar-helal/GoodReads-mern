const { Schema, default: mongoose } = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  bookPdfURL: { type: String, required: true },
  genres: [{ type: String, lowercase: true, required: true }],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book, bookSchema };
