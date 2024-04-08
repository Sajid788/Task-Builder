const asyncHandler = require("express-async-handler");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user_model");
const jwt = require("jsonwebtoken");


const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all the details" });
    }
  
    // Check if the user already exists
    const isUserExists = await UserModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({ error: "User Already Exists" });
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
  
      // Create a new user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      const userResponse = savedUser.toObject();
      delete userResponse.password;
  
      res.status(200).json(userResponse);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while registering the user" });
    }
  });


  const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.send({ msg: "please fill the all feild" });
    }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.send({ msg: "singup first" });
      }
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.send({
            token: token,
            msg: "Login sucessfull",
          });
        }
        res.send({ msg: "wrong credential" });
      });
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = {
    userRegister,
    userLogin,
  };