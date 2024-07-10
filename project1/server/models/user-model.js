const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//? secure the password with the bcrypt
userSchema.pre("save", async function () {
  const user = this;
  console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

// compare password:
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password)
}

// json web token
userSchema.methods.generateToken = function() {
  const token = jwt.sign(
      {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
  );
  return token;
};
// define the model or the collection name
const User = new mongoose.model("USER", userSchema);

module.exports = User; 