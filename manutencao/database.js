const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','mysql -u root1 -p','maus07',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;