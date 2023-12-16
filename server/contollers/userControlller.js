const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const verifyToken = require("../utils/verifyToken");
const UserToken = require("../models/userTokenModel");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ mssge: "Error Log In" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ mssge: "Account does not exist" });
    }

    // const isMatch = await User.comparePassword(req.body.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({
          mssge:
            "Invalid email or password. Please try again with the correct credentials.",
        });
    }
    const { token } = await generateToken(user);
    console.log(token);
    return res
      .status(200)
      .json({ mssge: "You have successfully logged in.", user, token });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(404).json({ mssge: "Error signup" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ mssge: "User with given email already exist" });
    }
    const newUser = new User({
      email,
      password,
      name,
    });
    await newUser.save();
    res.status(201).json({
      mssge: "Account created sucessfully",
      data: { email, password },
    });
  } catch (err) {
    res.status(500).json({ mssge: err });
  }
};

const logout = async (req, res) => {
  try {
    const userToken = await UserToken.findOne({ token: req.body.token });
    if (!userToken)
      return res.status(200).json({ mssge: "Logged Out Sucessfully" });
    await userToken.deleteOne();
    res.status(200).json({ mssge: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mssge: "Internal Server Error" });
  }
};

const getFavBooks = async (req, res) => {
  const token = req.headers["authorization"];
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({ mssge: "Authorization header missing" });
  }
  try {
    const { tokenDetails } = await verifyToken(token);
    const userId = tokenDetails._id;
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ mssge: "User not found" });
    }
    console.log(user.favBooks);
    return res.status(200).json(user.favBooks);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ mssge: "Invalid token" });
  }
};

const addToFavBooks = async (req, res) => {
  const bookToAdd = req.body;
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ mssge: "Authorization header missing" });
  }
  try {
    const { tokenDetails } = await verifyToken(token);

    const userId = tokenDetails._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ mssge: "User not found" });
    }
    const foundBook = user.favBooks.find((book) => book._id === bookToAdd._id);
    if (!foundBook) {
      user.favBooks.push(bookToAdd);
      await user.save();
    }
    res.status(200).json({ mssge: "Book has been added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ mssge: "Invalid token" });
  }
};

const removeFromFavBooks = async (req, res) => {
  const bookId = req.params.id;
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ mssge: "Authorization header missing" });
  }
  try {
    const { tokenDetails } = await verifyToken(token);
    const userId = tokenDetails._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ mssge: "User not found" });
    }
    user.favBooks = user.favBooks.filter((book) => book.id !== bookId);
    await user.save();
    res.status(200).json({ mssge: "Book has been removed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ mssge: "Invalid token" });
  }
};

module.exports = {
  login,
  signup,
  logout,
  getFavBooks,
  addToFavBooks,
  removeFromFavBooks,
};
