const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:name/todos", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      databaseManagement.getEntityByColumn(
        "todos",
        "userId",
        result[0].id.toString(),
        (result) => {
          res.send(result);
        }
      );
    }
  );
});

router.get("/:name/posts", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      databaseManagement.getEntityByColumn(
        "posts",
        "userId",
        result[0].id,
        (result) => {
          res.send(result);
        }
      );
    }
  );
});

router.get("/:name", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      res.send(result[0]);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("users", req.body, (result) => {
    res.send(`mange to insert new user with id ${result.insertId}`);
  });
});

router.put("/:name", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      databaseManagement.updateEntityById(
        "users",
        result[0].id,
        req.body,
        (result) => {
          res.send(`mange to update user with id ${req.params.name}`);
        }
      );
    }
  );
});

router.delete("/:name", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      databaseManagement.deleteEntityById("users", result[0].id, (result) => {
        res.send(`mange to delete user with id ${req.params.name}}`);
      });
    }
  );
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;