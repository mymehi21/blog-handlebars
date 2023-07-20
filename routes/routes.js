const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const {requireAuth} = require("../middlewares/authMiddleware")
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', requireAuth, dashboardController.dashboard);

router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);

router.get('/login', authController.getLogin);
router.post('/login', authController.login);

// Render the create.hbs view for creating a new post
router.get('/create',requireAuth, postController.getCreatePost);
router.post('/posts',requireAuth, postController.createPost);
router.get('/posts/:id', requireAuth,postController.getPost);
router.post('/posts/:id/comments',requireAuth, commentController.createComment);
router.get('/posts/:id/edit',requireAuth, postController.renderEditForm);
router.post('/posts/:id/edit',requireAuth, postController.updatePost);

// Delete a comment from a post
router.get('/posts/:id/comments/:commentId/delete',requireAuth, commentController.deleteComment);
router.get('/posts/:id/delete',requireAuth, postController.deletePost);
router.get('/logout',requireAuth, authController.logout);

router.get('/', postController.getAllPosts);

module.exports = router;


module.exports = router;