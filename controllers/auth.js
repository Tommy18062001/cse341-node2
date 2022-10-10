const User = require('../modules/auth');
const bcrypt = require("bcryptjs");

// POST REQUEST
const registerUser = async (req, res, next) => {
  console.log(req.body.name);
  const newUser = new User({ 
    name: req.body.name,
    email: req.body.email, 
    password: req.body.password
  });
  // Hash passworefore saving in database
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save()
              .then(user => {
                res.status(201).json(user);
              })
              .catch(err => {
                res.status(500).json({ err: err });
              });
      });
  });
  
};

  module.exports = {
    registerUser
  }

  