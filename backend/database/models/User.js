const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "user",
      }
    );

    //Password hash
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    User.authenticate = async function (username, password) {
      const user = await User.findOne({
        where: { username },
        attributes: ["id", "username", "email", "name", "password_hash"],
      });

      if (bcrypt.compareSync(password, user.password_hash)) {
        const {
          dataValues: { id, username, email, name },
        } = user;
        return { id, username, email, name };
      }

      return null;
    };
  }

  static associate(models) {
    this.hasMany(models.Message, { foreignKey: "user_id", as: "message" });
    this.belongsToMany(models.Chatroom, {
      foreignKey: "user_id",
      through: "user_room",
      as: "room",
    });
  }
}

module.exports = User;
