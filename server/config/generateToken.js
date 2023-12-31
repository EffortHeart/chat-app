const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./keys");

const generateToken = (id, tokenValidity = "30d") => {
  // console.log(tokenValidity);
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: tokenValidity,
  });
};

module.exports = generateToken;
