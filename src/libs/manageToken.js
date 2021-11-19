const jwt = require("jsonwebtoken");

function createAccessToken(input) {
  const accessToken = jwt.sign(input, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
}

function createRefreshToken(input) {
  const refreshToken = jwt.sign(input, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1h",
  });
  return refreshToken;
}

function verifyAccessToken(token) {
  const verifiedAccessToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return verifiedAccessToken;
}

module.exports = { createAccessToken, createRefreshToken, verifyAccessToken };
