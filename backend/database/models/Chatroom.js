const { Model, DataTypes } = require("sequelize");

class Chatroom extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "room",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Message, { foreignKey: "room_id", as: "message" });
    this.belongsToMany(models.User, {
      foreignKey: "room_id",
      through: "user_room",
      as: "user",
    });
  }
}

module.exports = Chatroom;
