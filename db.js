// db.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'sql.freedb.tech',
  dialect: 'mysql'
});

// Import your models
const { User, Post, Comment } = require('./models/models');

// Use sync to create the tables if they don't exist
sequelize.sync()
  .then(() => {
    console.log('Database tables created (if not exist)');
  })
  .catch((error) => {
    console.error('Error creating database tables:', error);
  });

module.exports = sequelize;
