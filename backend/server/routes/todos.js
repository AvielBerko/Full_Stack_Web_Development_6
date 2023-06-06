const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all todos
  res.send("hello from todos");
});

router.get("/:id", (req, res) => {
  // return todo by id
  res.send(`hello from todo with id ${req.params.id}`);
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
