const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    //checkuser
    const { email, password, telephone } = req.body;

    let query = { $or: [] };

    if (email && typeof email === "string") {
      query.$or.push({ email });
    } else if (telephone && typeof telephone === "string") {
      query.$or.push({ telephone });
    }

    let user = await User.findOne(query);

    if (user) {
      return res.status(422).json({
        error: "Unprocessable Entity",
        message: "User already exists",
      });
    }
    //encode
    user = new User({
      email,
      password,
      telephone,
    });

    user.password = CryptoJS.AES.encrypt(
      password,
      process.env.TOKEN_SEC
    ).toString();

    //save
    await user.save();
    res.status(201).json({
      message: "Registration successful",
      email: user.email,
      telephone: user.telephone,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
      message: "Please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    //check user
    const { email, password, telephone } = req.body;

    let query = { $or: [] };

    if (email && typeof email === "string") {
      query.$or.push({ email });
    }

    if (telephone && typeof telephone === "string") {
      query.$or.push({ telephone });
    }

    let user = await User.findOne(query);

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.TOKEN_SEC);
      const decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (password !== decryptPassword) {
        return res.status(401).json({
          error: "Invalid credentials",
          message: "The username or password you entered is incorrect.",
        });
      }

      //payload
      let payload = {
        user: {
          email: user.email,
          telephone: user.telephone,
        },
      };

      //gentoken
      jwt.sign(
        payload,
        process.env.TOKEN_SEC,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ message: "Login successful", token, payload });
        }
      );
    } else {
      res.status(401).json({
        error: "Invalid credentials",
        message: "The username or password you entered is incorrect.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
      message: "Please try again later",
    });
  }
};
