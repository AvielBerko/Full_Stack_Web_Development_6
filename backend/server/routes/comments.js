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

router.put("/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "comments",
    req.params.id,
    req.body,
    (result) => {
      // res.send(`mange to update comment with id ${req.params.id}`);
      res.send(req.body);
    }
  );
});

router.delete("/:id", (req, res) => {
  databaseManagement.deleteEntityById("comments", req.params.id, (result) => {
    res.send(`mange to delete comment with id ${req.params.id}`);
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
