// index.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const router = require('./routes/routes');
const sequelize = require('./db'); // Import the sequelize instance
const hbs = require('hbs')

dotenv.config();

const port = process.env.PORT || 3000;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);

hbs.registerPartials(__dirname + '/views');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}\nhttp://localhost:${port}`);
});
