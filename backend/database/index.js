const Sequelize = require('sequelize');
const pg = require('pg')
const dbConfig = require('./config')

const connection = new Sequelize(dbConfig)

const User = require('./models/User')

User.init(connection)

connection.authenticate().then(async () => {
    console.log('Conectado com sucesso no DB')

}).catch((err) => {
    console.log("Erro:", err)
    return;
})

module.exports = connection;