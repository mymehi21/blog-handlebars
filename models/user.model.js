// models/user.model.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db'); // Assuming you have set up the Sequelize instance

const User = sequelize.define('User', {
  // Define the model attributes (columns)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Other model configurations, associations, hooks, etc. can be added here.

module.exports = User;
