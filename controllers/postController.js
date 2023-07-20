const {User} = require("../models/models");
const {Post} = require("../models/models");
const {Comment} = require("../models/models");

exports.getCreatePost = (req, res) => {
  res.render('create',{ 
     session: req.session});
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  console.log(req.session.user.id);
  try {
    // Create the post in the database
    await Post.create({
      title,
      content,
      userId: req.session.user.id,
    });

    // Redirect to the home page or the newly created post page
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error while creating a post:', error);
    res.render('create', { error: 'An unexpected error occurred'  , session: req.session});
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database along with the associated user
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    // Pass req.session to the view
    res.render('home', { posts, session: req.session });
  } catch (error) {
    console.error('Error while fetching posts:', error);
    res.render('home', { error: 'Error while fetching posts' , session: req.session });
  }
};

// controllers/postController.js

// controllers/postController.js

exports.getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Fetch the post along with the associated user and comments
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ],
    });
    // Check if the post is created by the current user
    const isCurrentUserPost = post.userId == req.session.user?.id;

    // Check if each comment is made by the current user
    const commentsWithOwnership = post.Comments.map((comment) => {
      const isCurrentUserComment = comment.userId == req.session.user?.id;
      return {
        ...comment.toJSON(),
        isCurrentUserComment,
        createdAtFormatted: comment.createdAt.toLocaleString(),
        commenterUsername: comment.User.username
      };
    });

    // Attach the updated comments back to the post object
    post.Comments = commentsWithOwnership;

    res.render('post', { post, isCurrentUserPost, session: req.session });
  } catch (error) {
    console.error('Error while fetching post:', error);
    res.render('home', { error: 'Error while fetching post', session: req.session });
  }
};

exports.renderEditForm = async (req, res) => {
  const postId = req.params.id;

  try {
    // Fetch the post from the database
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.render('home', { error: 'Post not found' , session: req.session });
    }

    // Check if the post is created by the current user
    const isCurrentUserPost = post.userId == req.session.user?.id;

    // Render the edit form view with the post data
    res.render('edit', { post, isCurrentUserPost , session: req.session });
  } catch (error) {
    console.error('Error while fetching post:', error);
    res.render('home', { error: 'Error while fetching post' , session: req.session });
  }
};

// controllers/postController.js

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    // Find the post by postId
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.render('home', { error: 'Post not found'  , session: req.session});
    }

    // Check if the post is created by the current user
    if (post.userId == req.session.user?.id) {
      // Update the post data
      await post.update({ title, content });

      // Redirect to the individual post page after the update
      res.redirect(`/posts/${postId}`);
    } else {
      // If the post doesn't belong to the current user, redirect to the home page or show an error
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error while updating post:', error);
    res.redirect(`/posts/${postId}`);
  }
};

// controllers/postController.js

exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post by postId
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.render('home', { error: 'Post not found'  , session: req.session});
    }

    // Check if the post is created by the current user
    if (post.userId == req.session.user?.id) {
      // Delete the post from the database
      await post.destroy();

      // Redirect to the home page or any other page after successful deletion
      res.redirect('/');
    } else {
      // If the post doesn't belong to the current user, redirect to the home page or show an error
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error while deleting post:', error);
    res.redirect(`/posts/${postId}`);
  }
};
