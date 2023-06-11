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
    res.send(`mange to insert new user with id ${result[0].insertId}`);
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

// router.put("/:name", (req, res) => {
//   databaseManagement.getEntityByColumn(
//     "users",
//     "username",
//     req.params.name,
//     (result) => {
//       databaseManagement.updateEntityById(
//         "users",
//         result[0].id,
//         req.body,
//         (result) => {
//           res.send(`mange to update user with id ${req.params.name}`);
//         }
//       );
//     }
//   );
// });

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
