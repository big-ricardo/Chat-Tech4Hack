"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("message", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "user", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "room", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("message");
  },
};
