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
      if (err) {
        console.log("verifyAccessToken error ", err);
      }
      return decoded;
    }
  );
}

function verifyRefreshToken(token) {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET,
    function (err, decoded) {
      if (err) {
        console.log("verifyRefreshToken error ", err);
      }
      return decoded;
    }
  );
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
