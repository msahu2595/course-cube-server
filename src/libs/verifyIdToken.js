const { OAuth2Client } = require("google-auth-library");

async function verifyIdToken(token, webLogin) {
  const client = new OAuth2Client(
    webLogin ? process.env.WEB_CLIENT_ID : process.env.CLIENT_ID
  );
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: webLogin ? process.env.WEB_CLIENT_ID : process.env.CLIENT_ID,
  });
  const { email, email_verified, name, picture } = ticket.getPayload();
  return { email, email_verified, name, picture };
}

module.exports = verifyIdToken;
