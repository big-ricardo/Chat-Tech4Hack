const Sequelize = require("sequelize");
const pg = require("pg");
const dbConfig = require("./config");

const connection = new Sequelize(dbConfig);

const User = require("./models/User");
const Chatroom = require("./models/Chatroom");
const Message = require("./models/Message");

User.init(connection);
Message.init(connection);
Chatroom.init(connection);

User.associate(connection.models);
Message.associate(connection.models);
Chatroom.associate(connection.models);

connection
  .authenticate()
  .then(async () => {
    console.log("Conectado com sucesso no DB");
  })
  .catch((err) => {
    console.log("Erro:", err);
    return;
  });

module.exports = connection;
