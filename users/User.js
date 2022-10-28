const Sequelize = require("sequelize");
const connection = require ("../database/database");

const User = connection.define('user', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    },nomeUsuario:{
        type: Sequelize.STRING,
        allowNull: false

    }
});

User.sync({Force: false}); // cria a tabela no banco

module.exports = User;
