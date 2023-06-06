const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all users_passwords
  res.send("hello from users_passwords");
});

router.get("/:name", (req, res) => {
  // return user by name
  res.send(`hello from user with name ${req.params.name}`);
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
