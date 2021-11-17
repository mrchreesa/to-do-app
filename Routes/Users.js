const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User");

module.exports = function (database) {
  router.post("/", (req, res) => {
    const { username, password, email } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      const newUser = new User({
        username,
        password: hash,
        email,
      });
      newUser.save();

      res.send({ username, email });
    });
  });

  router.post("/session", (req, res) => {
    const { username, password, email } = req.body;

    User.find({ email }).then((attemptedLoginUserData) => {
      if (attemptedLoginUserData.length) {
        const foundUser = attemptedLoginUserData[0];
        bcrypt
          .compare(password, foundUser.password)
          .then((isPasswordCorrect) => {
            if (isPasswordCorrect) {
              const userData = { username: foundUser.username, email };
              res.cookie("user", JSON.stringify(userData), {
                httpOnly: true,
                expiresIn: 86400,
              });
              res.send(userData);
            } else {
              res.status(401).send("Incorrect credentials");
            }
          });
      }
    });
  });

  router.get("/session", (req, res) => {
    const cookieData = JSON.parse(req.cookies.user);
    console.log("test");
  });

  return router;
};
