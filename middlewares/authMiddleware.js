// middleware/authMiddleware.js

const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // User is not authenticated, redirect to the login page or any other desired page
      res.redirect('/login');
    }
  };
  
  module.exports = { requireAuth };
  