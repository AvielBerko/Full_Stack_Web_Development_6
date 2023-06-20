const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "roles",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("roles", req.body, (result) => {
    console.log(result);
    databaseManagement.getEntityByColumn(
      "roles",
      "id",
      result.insertId,
      (result) => {
        res.send(result);
      }
    );
    console.log(`SERVER: mange to insert new roles with id ${result.insertId}`);
  });
});

router.put("/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "roles",
    req.params.id,
    req.body,
    (result) => {
      // res.send(`mange to update roles with id ${req.params.id}`);
      res.send(req.body);
    }
  );
});

router.delete("/:id", (req, res) => {
  databaseManagement.deleteEntityById("roles", req.params.id, (result) => {
    res.send(`mange to delete roles with id ${req.params.id}`);
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
