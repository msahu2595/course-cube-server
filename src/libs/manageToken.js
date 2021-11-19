const jwt = require("jsonwebtoken");

function createAccessToken(input) {
  const accessToken = jwt.sign(input, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}

function createRefreshToken(input) {
  const refreshToken = jwt.sign(input, process.env.JWT_REFRESH_SECRET);
  return refreshToken;
}

function verifyAccessToken(token) {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET,
    function (err, decoded) {
      return decoded;
    }
  );
}

function verifyRefreshToken(token) {
  const verifiedRefreshToken = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET
  );
  return verifiedRefreshToken;
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
