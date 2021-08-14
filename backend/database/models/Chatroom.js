const { Model, DataTypes } = require('sequelize');

class Chatroom extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.UUID,
            name: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'room_id', through: 'user_room', as: 'user' });
    }
}

module.exports = Chatroom;