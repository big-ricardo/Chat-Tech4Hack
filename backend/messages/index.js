const adminToken = require('../services/adminToken')

module.exports = async function (context, req) {

  const user = await adminToken.decode(req)

  if (!user) {
    return;
  }

  const message = req.body;

  message.sender = user.username;

  return {
    'target': 'newMessage',
    'arguments': [message]
  };
};