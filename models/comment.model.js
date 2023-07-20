// models/comment.model.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db'); // Assuming you have set up the Sequelize instance

const Comment = sequelize.define('Comment', {
  // Define the model attributes (columns)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  // Other model configurations
  timestamps: true, // Adds createdAt and updatedAt fields
  underscored: true, // Use snake_case for the automatically generated timestamp fields
});


module.exports = Comment;