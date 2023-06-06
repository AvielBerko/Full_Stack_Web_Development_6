const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);



router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "todos",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("todos", req.body, (result) => {
    res.send(`mange to insert new todos with id ${result.insertId}`);
  });
});

router.delete("/:id", (req, res) => {
  databaseManagement.deleteEntityById(
    "todos",
    req.params.id,
    (result) => {
      res.send(`mange to delete todos with id ${req.params.id}`);
    }
  );
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
