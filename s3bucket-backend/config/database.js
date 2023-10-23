const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'sroo.cufw4bzo6bry.ap-southeast-2.rds.amazonaws.com',
    database: 'test_db',
    username: 'sroo_admin',
    password: '7hXPPiTl66KzdQjD',
    define: {
      underscored: true, // Use underscores in column names (e.g., line_item_id)
    },
    dialectOptions: {
      options: {
          encrypt: true, // For encrypted connections
          trustServerCertificate:true
      },
    },
  });

module.exports = sequelize;
