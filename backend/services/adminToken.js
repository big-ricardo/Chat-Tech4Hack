const jwt = require('jsonwebtoken');

const secretForTokenSigning = process.env.TOKEN_SECRET;

module.exports = {
    async decode(req) {
        const token = req.headers['token'] || req.query['token'];

        if (!token) {
            return false;
        }

        const decodedToken = jwt.verify(token, secretForTokenSigning);

        if (!decodedToken || !decodedToken.sub) {
            return false;
        }

        const { username, password } = decodedToken.sub;

        if (!user) {
            return false;
        }

        return user;
    },

    async encode({ username, password }) {

        const token = jwt.sign({ sub: { username, password } }, secretForTokenSigning);

        return token;
    }
}