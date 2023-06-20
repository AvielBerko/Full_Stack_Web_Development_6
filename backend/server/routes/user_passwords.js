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
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.body.username,
    (result) => {
      console.log("1");
      console.log(result);
      if (result.length == 1) {
        req.body.user_id = result[0].id;
        console.log("--------------------------------------------------------");
        console.log(req.body);
        console.log("--------------------------------------------------------");
        databaseManagement.insertQuery("user_passwords", req.body, (result) => {
          console.log("2");
          console.log(result);
          databaseManagement.getEntityByColumn(
            "user_passwords",
            "id",
            result.insertId,
            (result) => {
              res.send(result);
            }
          );
          console.log(
            `SERVER: mange to insert new user_passwords with id ${result.insertId}`
          );
        });
      } else {
        res.send("username not found");
      }
    }
  );
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
