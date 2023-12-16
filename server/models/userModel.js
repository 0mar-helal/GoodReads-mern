const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const { bookSchema } = require("./bookModel");

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  // roles: {
  //   type: [String],
  //   enum: ["user", "admin"],
  //   default: ["user"],
  // },
  name: { type: String, required: true },
  favBooks: [bookSchema],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(procees.env.SALT_NUM);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
