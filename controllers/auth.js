const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function(_, User, Users) {
  return {
    SetRouting: function(router) {
      router.post("/login", this.postLogin);
    },

    postLogin: function(req, res) {
      const { errors, isValid } = User.LoginValidation(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      // Find user by email
      Users.findOne({ email }).then(user => {
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }

        //Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User Matched
            const payload = {
              id: user.id,
              username: user.username
            };

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      });
    }
  };
};
