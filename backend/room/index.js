const roomController = require("../controller/roomController");
const StatusCodes = require("http-status-codes");

module.exports = async function (context, req) {
  let response = {};

  switch (req.method) {
    case "POST":
      response = await roomController.store(req);
      context.res = response;
      break;
    case "GET":
      response = await roomController.show(req);
      context.res = response;
      break;
    default:
      context.res = { statusCode: StatusCodes.BAD_REQUEST };
  }
  return;
};
