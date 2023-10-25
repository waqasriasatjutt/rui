const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mssql', // Use the SQL Server dialect
  host: 'sroo.cufw4bzo6bry.ap-southeast-2.rds.amazonaws.com',
  port: 1433, // SQL Server default port
  database: 'sroo_client',
  username: 'sroo_admin',
  password: '7hXPPiTl66KzdQjD',
  // logging: console.log, // Enable SQL query logging
  dialectOptions: {
    options: {
      encrypt: true, // For encrypted connections
      trustServerCertificate:true
    },
  },
});
// sequelize.authenticate() // Verify database connection
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// sequelize.sync({ logging: console.log }) // Synchronize models
//   .then(() => {
//     console.log('Models synchronized successfully.');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing models:', err);
//   });
// sequelize
//   .query('CREATE DATABASE sroo_client')
//   .then(() => {
//     console.log('Database created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating database:', error);
//   });
module.exports = sequelize;
