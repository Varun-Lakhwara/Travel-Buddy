const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All Fields Are Required. "));
  }

  const hashPass = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPass,
  });

  try {
    await newUser.save();
    res.json({ message: "Signup Successful." });
  } catch (err) {
    return next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All Fields Are Required."));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return errorHandler(404, "User not found.");
    }

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      {
        userId: validUser._id,
      },
      process.env.JWT_SECRET
    );

    const {password : pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

module.exports = signup;
module.exports = signin;
