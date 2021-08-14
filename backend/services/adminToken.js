const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

const secretForTokenSigning = process.env.TOKEN_SECRET;

module.exports = {
  async decode(req) {
    const token = req.headers["token"] || req.query["token"];

    if (!token) {
      return false;
    }

    const decodedToken = jwt.verify(token, secretForTokenSigning);

    if (!decodedToken || !decodedToken.sub) {
      return false;
    }

    const { username, password } = decodedToken.sub;

    const user = await User.authenticate(username, password);

    if (!user) {
      return false;
    }

    return user;
  },

  async encode({ username, password }) {
    const user = await User.authenticate(username, password);

    if (!user) {
      return false;
    }

    const token = jwt.sign(
      { sub: { username, password } },
      secretForTokenSigning
    );

    return token;
  },
};
