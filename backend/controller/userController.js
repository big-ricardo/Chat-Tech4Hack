require('dotenv').config()

const adminToken = require('../services/adminToken')
const StatusCodes = require('http-status-codes')
const jwt = require('jsonwebtoken')
const connection = require('../database')
const User = require('../database/models/User')
const bcrypt = require("bcrypt")

module.exports = {

    async store({body}) {
        console.log(body)
        const { name, username, email, password } = body

        if (!name && !username && !email && !password) {
            return { statusCode: StatusCodes.BAD_REQUEST };
        }

        const user = await User.create({ name, username, email, password });

        if (user) {
            return {
                body: user,
                headers: { 'content-type': 'application/json' }
            };
        }

        // return { statusCode: StatusCodes.NOT_FOUND };
    },

    async show(req) {
        const id = req.query['userId']

        if (!id) {
            return { statusCode: StatusCodes.BAD_REQUEST };
        }

        const user = await User.findOne({
            where: { id },
            attributes: {
                exclude: ['password', 'id', 'createdAt', 'updatedAt']
            }
        });

        if (user) {
            return { body: user, headers: { 'content-type': 'application/json' }, statusCode: StatusCodes.OK };

        } else {
            return { statusCode: StatusCodes.BAD_REQUEST };
        }
    }
}
