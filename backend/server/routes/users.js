const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:id/todos", (req, res) => {
  databaseManagement.getEntityByColumn(
    "todos",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.get("/:id/posts", (req, res) => {
  databaseManagement.getEntityByColumn(
    "posts",
    "userId",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.get("/:id", (req, res) => {
  databaseManagement.getEntityByColumn(
    "users",
    "id",
    req.params.id,
    (result) => {
      res.send(result);
    }
  );
});

router.get("/", (req, res) => {
  databaseManagement.getEntityByJoin(
    "users",
    "user_passwords",
    "id",
    "userId",
    "username",
    req.query.username,
    "password",
    req.query.password,

    (result) => {
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("users", req.body, (result) => {
    console.log(result);
    databaseManagement.getEntityByColumn(
      "users",
      "id",
      result.insertId,
      (result) => {
        res.send(result);
      }
    );
    console.log(`SERVER: mange to insert new user with id ${result.insertId}`);
  });
});

router.post("/:id/posts", (req, res) => {
  databaseManagement.insertQuery("posts", req.body, (result) => {
    console.log(result);
    databaseManagement.getEntityByColumn(
      "posts",
      "id",
      result.insertId,
      (result) => {
        res.send(result);
      }
      );
      console.log(`mange to insert new todo with id ${result.insertId}`);
  });
});

router.put("/:userID/todos/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "todos",
    req.params.id,
    req.body,
    (result) => {
      res.send(`mange to update todo with id ${req.params.id}`);
    }
  );
});

router.put("/:userID/posts/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "posts",
    req.params.id,
    req.body,
    (result) => {
      res.send(`mange to update post with id ${req.params.id}`);
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
