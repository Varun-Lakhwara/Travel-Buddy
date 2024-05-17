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
        id: validUser._id, isAdmin : validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const {password : pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

const google = async ( req, res, next) =>{
  const { name, email, googlePhotoUrl } = req.body;

  try{
    const user = await User.findOne({email});

    if(user){
      const token = jwt.sign({ id : user._id, isAdmin : user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest} = user._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly: true,
      })
      .json(rest);
    }

      else{
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPass = bcryptjs.hashSync(generatePassword,10);
        const newUser = new User({
          username : 
          name.toLowerCase().split(' ').join('') + 
          Math.random().toString(9).slice(-4),
          email,
          password : hashedPass,
          profilePicture : googlePhotoUrl,
        });
        
        await newUser.save();
        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
        const {password, ...rest} = newUser._doc;
        res .status(200)
        .cookie('access_token',token, {
          httpOnly : true,
        })
        .json(rest);
      }
  } catch(error){
    next(error);
    console.log(error);
  }
};

module.exports=signup;
module.exports=signin;
module.exports=google;

