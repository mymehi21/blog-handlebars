# Express MVC Blog

This is an Express.js application implementing a simple blog with MVC architecture, MySQL database, and user authentication. Users can sign up, log in, create posts, view posts, add comments, and more.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- User authentication (signup, login, logout) using `express-session` and `bcrypt`
- Create, edit, and delete posts
- Add comments to posts
- View posts, including post details and associated comments
- Route protection to restrict access to certain routes based on authentication status
- MySQL database with Sequelize ORM for data storage

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- MySQL (https://www.mysql.com/)

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/express-mvc-blog.git
```

2. Install the dependencies:

```bash
cd express-mvc-blog
npm install
```

3. Set up your MySQL database. Create a database and update the database connection configuration in `db.js`.

## Configuration

Configure the environment variables by creating a `.env` file in the root of the project:

```bash
DB_HOST=loclhost
DB_PORT=3306
DB_DATABASE=database-name
DB_USERNAME=database-username
DB_PASSWORD=database-password

SESSION_SECRET=session-secret-key

PORT=3000
```

## Usage

To start the application, run the following command:

```bash
npm start
```

Visit `http://localhost:3000` in your web browser to access the blog application.

## Technologies Used

- Express.js
- Handlebars (HBS) template engine
- MySQL database with Sequelize ORM
- `express-session` for session management
- `bcrypt` for password hashing
- Node.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to fit your application's specific details and add any additional sections or information that you think would be helpful for your users. Good luck with your Express MVC blog application!