const User = require("../modals/auth");

// Create New User
exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  // Check if the username or password empty
  if (!username) {
    return res
      .status(400)
      .json({ message: "Username is required fields" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ message: "Password is required fields" });
  }
  try {
    // Check if the username already exists
    const userCount = await User.count({ where: { username } });
    if (userCount > 0) {
      // Username already exists, return an error
      return res.status(400).json({ message: "Username already exists" });
    }
    // Insert the new user into the "users" table
    const user = await User.create({ username, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ message: "Internal server error" });
    return next(error);
  }
};


// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist, please sign up" });
    }

    if (password === user.password) {
      res
        .status(200)
        .json({ username: user.username, message: "Login successful" });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Database query error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};