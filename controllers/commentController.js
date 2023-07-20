const {User, Post, Comment} = require("../models/models");

exports.createComment = async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  console.log(comment);
  req.session.user.id

  try {
    // Create the comment in the database with the associated post and user
    await Comment.create({
      "content": comment,
      postId,
      userId: req.session.user.id,
    });

    // Redirect back to the same post page after adding the comment
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error('Error while adding comment:', error);
    res.redirect(`/posts/${postId}`);
  }
};

exports.deleteComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;

  try {
    // Find the comment by commentId and delete it if it belongs to the current user
    await Comment.destroy({
      where: {
        id: commentId,
        userId: req.session.user.id,
      }
    });

    // Redirect back to the same post page after deleting the comment
    res.redirect(`/posts/${postId}`);
  } catch (error) {
    console.error('Error while deleting comment:', error);
    res.redirect(`/posts/${postId}`);
  }
};