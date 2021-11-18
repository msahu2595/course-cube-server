const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

async function verifyIdToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { email, email_verified, name, picture } = ticket.getPayload();
  return { email, email_verified, name, picture };
}

module.exports = verifyIdToken;
