const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql', // Use the SQL Server dialect
  host: 'sroo.cufw4bzo6bry.ap-southeast-2.rds.amazonaws.com',
  port: 1433, // SQL Server default port
  database: 'test_db',
  username: 'sroo_admin',
  password: '7hXPPiTl66KzdQjD',
  dialectOptions: {
    options: {
      encrypt: true, // For encrypted connections
      trustServerCertificate:true
    },
  },
});

module.exports = sequelize;
