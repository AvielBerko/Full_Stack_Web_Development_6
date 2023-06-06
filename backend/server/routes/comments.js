const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  databaseManagement.getEntityByColumn(
    "comments",
    "postId",
    req.query.postId,
    (result) => {
      res.send(result);
    }
  );
});

router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "comments",
    "postId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("comments", req.body, (result) => {
    res.send(`mange to insert new comment with id ${result.insertId}`);
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
