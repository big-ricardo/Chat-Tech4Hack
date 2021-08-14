const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        text: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "message",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Chatroom, { foreignKey: "room_id", as: "room" });
  }
}

module.exports = Message;
