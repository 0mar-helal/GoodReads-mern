const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const dotenv = require("dotenv");

app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello BookStore mernstack");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`start server on port ${port}`);
  });
});

app.use("/books", bookRouter);
app.use("/", userRouter);
