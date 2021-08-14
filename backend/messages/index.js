const adminToken = require("../services/adminToken");
const api = require("../services/api");
const Message = require("../database/models/Message");
const Chatroom = require("../database/models/Chatroom");

module.exports = async function (context, req) {
  const roomId = req.headers["room_id"];

  const user = await adminToken.decode(req);
  //const room = await Chatroom.findByPk(roomId);

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
/*
  await Message.create({
    text: message.text,
    user_id: user.id,
    room_id: roomId,
  });
*/
  return {
    userId: recipientUserId,
    target: "newMessage",
    arguments: [message],
  };
};
