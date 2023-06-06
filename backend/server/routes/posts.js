const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "posts",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("posts", req.body, (result) => {
    res.send(`mange to insert new post with id ${result.insertId}`);
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
