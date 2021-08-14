const authController = require('../controller/authController')
const StatusCodes = require('http-status-codes')

module.exports = async function (context, req) {

    let response = {};

    switch (req.method) {
        case 'POST':
            response = await authController.show(req);
            context.res = response
            break;
        case 'GET':
            response = await authController.store(req);
            context.res = response
            break;
        default:
            context.res = { statusCode: StatusCodes.BAD_REQUEST };
    }
    return;
}