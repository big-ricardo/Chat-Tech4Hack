const adminToken = require("../services/adminToken");
const api = require("../services/api");
const Message = require("../database/models/Message");

module.exports = async function (context, req) {
  const user = await adminToken.decode(req);

  if (!user) {
    return;
  }

  const message = req.body;

  let recipientUserId = "";
  if (message.recipient) {
    recipientUserId = message.recipient;
    message.isPrivate = true;
  }

  message.sender = user.username;

  const { emotions, sentiment } = await api
    .post("/Analyze", {
      T: message.text,
      EM: true,
      S: true,
    })
    .then(({ data }) => data)
    .catch((e) => console.log("erro", e));

  message.emotions = emotions;
  message.sentiments = sentiment;

  await Message.create({user_id: message.})

  console.log(message);

  return {
    userId: recipientUserId,
    target: "newMessage",
    arguments: [message],
  };
};
