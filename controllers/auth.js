const User = require('../modules/auth');
const bcrypt = require("bcrypt");

// POST REQUEST
const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
  
    // mongodb method to save
    user.save()
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }
  catch(error) {
    res.status(500).json({ error: error });
  };
  
};

  module.exports = {
    registerUser
  }