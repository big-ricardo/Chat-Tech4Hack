require("dotenv").config();

const StatusCodes = require("http-status-codes");
const Chatroom = require("../database/models/Chatroom");
const User = require("../database/models/User");
const adminToken = require("../services/adminToken");
const connection = require("../database");

module.exports = {
  async store(req) {
    //console.log(body)
    const { name } = req.body;
    const { id } = await adminToken.decode(req);

    if (!name || !id) {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const room = await Chatroom.create({ name });

    room.addUser(id);

    if (room) {
      return {
        body: room,
        headers: { "content-type": "application/json" },
      };
    }

    return { statusCode: StatusCodes.NOT_FOUND };
  },

  async show(req) {
    const {id} = await adminToken.decode(req)
  
    const room = await Chatroom.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (room) {
      return {
        body: room,
        headers: { "content-type": "application/json" },
        statusCode: StatusCodes.OK,
      };
    } else {
      return { statusCode: StatusCodes.BAD_REQUEST };
    }
  },
};
