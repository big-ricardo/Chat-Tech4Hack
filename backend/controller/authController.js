require("dotenv").config();

const adminToken = require("../services/adminToken");
const StatusCodes = require("http-status-codes");
const connection = require("../database");

module.exports = {
  async show(req) {
    const user = await adminToken.decode(req);

    if (!user) {
      return { statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION };
    }

    return {
      body: user,
      headers: { "content-type": "application/json" },
    };
  },

  async store(req) {
    const authHeaderBase64 =
      req.headers["Authorization"] || req.headers["authorization"];

    if (!authHeaderBase64 || !authHeaderBase64.startsWith("Basic ")) {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const authHeader = Buffer.from(
      authHeaderBase64.substr(6),
      "base64"
    ).toString();

    if (authHeader.indexOf(":") <= 0) {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const [username, password] = authHeader.split(":");

    const token = await adminToken.encode({ username, password });

    if (!token) {
      return { statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION };
    }

    return {
      body: { accessToken: token },
      headers: { "content-type": "application/json" },
    };
  },
};
