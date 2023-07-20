const User = require("./user.model");
const Post = require("./post.model");
const Comment = require("./comment.model");
const { Sequelize, DataTypes } = require('sequelize');


User.hasMany(Post, { foreignKey: 'userId' }); // User can have many Posts
User.hasMany(Comment, { foreignKey: 'userId' }); // User can have many Comments
Post.belongsTo(User, { foreignKey: 'userId' }); // Post belongs to a User
Post.hasMany(Comment, { foreignKey: 'postId' }); // Post can have many Comments
Comment.belongsTo(User, { foreignKey: 'userId' }); // Comment belongs to a User
Comment.belongsTo(Post, { foreignKey: 'postId' }); // Comment belongs to a Post

module.exports = {
    User,
    Post,
    Comment,
  };