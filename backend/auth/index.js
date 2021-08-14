const authController = require('../controller/authController')

module.exports = async function (context, req) {

    switch (req.method) {
        case 'POST':
            const response = authController.show(req);
            context.res = response
            break;
        case 'GET':
            response = authController.store(req);
            context.res = response
            break;
        default: 
        context.res = { statusCode: StatusCodes.NOT_ACCEPTABLE };
    }

    return;
}