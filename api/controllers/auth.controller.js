const User  = require ("../models/user.model.js");
const bcryptjs = require("bcryptjs");


const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "" ) {
    return res.status(400).json({ message: "All Fields Are Required." });
  }

  const hashPass = bcryptjs.hashSync(password, 10);

  const newUser = new User ({
    username,
    email,
    password : hashPass,
  });
  
try {
    await newUser.save();
    res.json({ message: "Signup Successful." });
}
catch (err){
    console.log(err);
    return res.status(500).json({message: err.message});
}
 
};

module.exports = signup;
