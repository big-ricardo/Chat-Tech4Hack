const { Model, DataTypes } = require('sequelize');

class Message extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.UUID,
            room_id: DataTypes.UUID,
            text: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Chatroom, { foreignKey: 'room_id', as: 'room' });
    }

}

module.exports = Message;