require("dotenv").config();

const StatusCodes = require("http-status-codes");
const User = require("../database/models/User");
const connection = require("../database");

module.exports = {
  async store({ body }) {
    //console.log(body)
    const { name, username, email, password } = body;

    if (!name && !username && !email && !password) {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const user = await User.create({ name, username, email, password });

    if (user) {
      return {
        body: {},
        headers: { "content-type": "application/json" },
      };
    }

    return { statusCode: StatusCodes.NOT_FOUND };
  },

  async show(req) {
    const id = req.query["userId"];

    if (!id) {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const user = await User.findOne({
      where: { uuid: id },
      attributes: {
        exclude: ["password", "id", "createdAt", "updatedAt"],
      },
    });

    if (user) {
      return {
        body: user,
        headers: { "content-type": "application/json" },
        statusCode: StatusCodes.OK,
      };
    } else {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }
  },
};
