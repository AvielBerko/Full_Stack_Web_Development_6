const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all users
  res.send("hello from users");
});

router.get("/:name", (req, res) => {
  // return user by id
  res.send(`hello from user with name ${req.params.name}`);
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
