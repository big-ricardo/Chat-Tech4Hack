require('dotenv').config()

module.exports = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || '5432',
    define: {
        timestamps: true,
        underscored: true,
    }
};