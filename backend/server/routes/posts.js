const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all posts
  res.send("hello from posts");
});

router.get("/:id", (req, res) => {
  // return post by id
  res.send(`hello from post with id ${req.params.id}`);
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;