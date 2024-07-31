const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //code
    const token_access = req.headers["access_token"];

    if (!token_access) {
      return res.status(401).send("No token");
    }

    //check refresh_token
    const decoded_access = jwt.verify(token_access, process.env.TOKEN_SEC);

    if (!decoded_access) {
      return res.status(401).send("Token invalid");
    }

    next();
  } catch (err) {
    //error
    res.send("token invalid");
  }
};
