const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, process.env.SECRET);
  //   res.locals.email = decoded.email;
  req.body.userid = decoded.id;
  next();
};

module.exports = authenticate;
