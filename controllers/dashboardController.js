// controllers/dashboardController.js

const { Post, Comment } = require('../models/models');

exports.dashboard = async (req, res) => {
  try {
    // Get the user's posts
    const userPosts = await Post.findAll({
      where: { userId: req.session.user.id },
      attributes: ['id', 'title', 'content'],
    });


    res.render('dashboard', { title: 'Dashboard', session: req.session, userPosts });
  } catch (error) {
    console.error('Error while fetching dashboard data:', error);
    res.render('home', { error: 'Error while fetching dashboard data', session: req.session });
  }
};
