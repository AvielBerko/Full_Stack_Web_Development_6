const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "user_passwords",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("user_passwords", req.body, (result) => {
    res.send(`mange to insert new user_passwords with id ${result.insertId}`);
  });
});

router.put("/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "user_passwords",
    req.params.id,
    req.body,
    (result) => {
      // res.send(`mange to update user_passwords with id ${req.params.id}`);
      res.send(req.body);
    }
  );
});

router.delete("/:id", (req, res) => {
  databaseManagement.deleteEntityById(
    "user_passwords",
    req.params.id,
    (result) => {
      res.send(`mange to delete user_passwords with id ${req.params.id}`);
    }
  );
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
