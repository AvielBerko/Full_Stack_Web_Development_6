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
    console.log(result);
    databaseManagement.getEntityByColumn(
      "todos",
      "id",
      result.insertId,
      (result) => {
        res.send(result);
      }
    );
    console.log(`SERVER: mange to insert new todos with id ${result.insertId}`);
  });
});

router.put("/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "todos",
    req.params.id,
    req.body,
    (result) => {
      // res.send(`mange to update todos with id ${req.params.id}`);
      res.send(req.body);
    }
  );
});

router.delete("/:id", (req, res) => {
  databaseManagement.deleteEntityById("todos", req.params.id, (result) => {
    res.send(`mange to delete todos with id ${req.params.id}`);
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
