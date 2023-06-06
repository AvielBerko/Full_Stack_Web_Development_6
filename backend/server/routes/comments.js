const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all comments
  res.send("hello from comments");
});

router.get("/:id", (req, res) => {
  // return comment by id
  res.send(`hello from comment with id ${req.params.id}`);
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
