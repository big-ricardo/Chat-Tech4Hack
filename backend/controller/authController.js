const adminToken = require('../services/adminToken')

module.exports = async function show(req) {
    const user = await adminToken.decode(req)

    if (!user) {
        return { statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION };
    }

    return {
        body: user,
        headers: { 'content-type': 'application/json' }
    }
}

module.exports = async function store(req) {
    const authHeaderBase64 = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeaderBase64 || !authHeaderBase64.startsWith('Basic ')) {

        return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const authHeader = Buffer.from(authHeaderBase64.substr(6), 'base64').toString();

    if (authHeader.indexOf(':') <= 0) {
        return { statusCode: StatusCodes.BAD_REQUEST };
    }

    const [username, password] = authHeader.split(':')

    if (!user) {
        return { statusCode: StatusCodes.NOT_ACCEPTABLE };
    }

    const token = await adminToken.encode({ username, password })

    return {
        body: { accessToken: token, ...user },
        headers: { 'content-type': 'application/json' }
    };
}

