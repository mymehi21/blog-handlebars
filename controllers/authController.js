const { User } = require("../models/models");
const { Post } = require("../models/models");
const { Comment } = require("../models/models");
const bcrypt = require("bcrypt");

// Render the signup.hbs view for user registration
exports.getSignup = (req, res) => {
  res.render("signup", {  session: req.session});
};
// Handle form submission for user registration
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({
      where: { username: username },
    });

    if (existingUser) {
      return res.render("signup", {
        error: "Username or email already in use" , session: req.session
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user in the database with the hashed password
    await User.create({ username, email, password: hashedPassword });

    // Redirect to the home page or the user profile page
    res.redirect("/");
  } catch (error) {
    console.error("Error while signing up:", error);
    res.render("signup", { error: "An unexpected error occurred" , session: req.session });
  }
};

// Handle form submission for user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.render("login", { error: "Invalid username or password" , session: req.session });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { error: "Invalid username or password" , session: req.session});
    }

    // Set user data in the session
    req.session.user = {
      id: user.id,
      username: user.username,
      // Add more user data as needed...
    };
    // Redirect to the home page or the user profile page
    res.redirect("/");
  } catch (error) {
    console.error("Error while logging in:", error);
    res.render("login", { error: "An unexpected error occurred", session: req.session });
  }
};

exports.getLogin = (req, res) => {
  res.render("login", {session: req.session});
};

// controllers/authController.js

exports.logout = (req, res) => {
  // Clear the user session by destroying it
  req.session.destroy((err) => {
    if (err) {
      console.error('Error while logging out:', err);
    }
    // Redirect to the home page or any other desired page after logout
    res.redirect('/');
  });
};
