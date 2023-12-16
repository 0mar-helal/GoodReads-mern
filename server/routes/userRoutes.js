const { Router } = require("express");
const {
  login,
  signup,
  logout,
  addToFavBooks,
  getFavBooks,
  removeFromFavBooks,
} = require("../contollers/userControlller");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);

userRouter.get("/user/favourite_book", getFavBooks);
userRouter.post("/user/favourite_book/add", addToFavBooks);
userRouter.delete("/user/favourite_book/remove/:id", removeFromFavBooks);

module.exports = userRouter;
