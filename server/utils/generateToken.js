const UserToken = require("../models/userTokenModel");
const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "30d" });
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne();

    await new UserToken({ userId: user._id, token }).save();

    return Promise.resolve({ token });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
module.exports = generateToken;
