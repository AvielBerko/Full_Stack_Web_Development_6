const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/:id/todos", (req, res) => {
  if (req.query.completed) {
    databaseManagement.getEntityByColumns(
      "todos",
      "userId",
      req.params.id,
      "completed",
      req.query.completed,
      (result) => {
        res.send(result);
      }
    );
  } else {
    databaseManagement.getEntityByColumn(
      "todos",
      "userId",
      req.params.id,
      (result) => {
        res.send(result);
      }
    );
  }
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

router.get("/:id/logout", (req, res) => {
  databaseManagement.deleteCookieByUserId(req.params.id)
    ? res.send(JSON.parse('{"result" : "logout" }'))
    : res.status(404).send(JSON.parse('{"result" : "not logout" }'));
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
      if (!result || result.length == 0 || result[0].id == undefined) {
        res.status(404).send(JSON.parse('[{"result" : "not found" }]'));
        return;
      }

      result[0][databaseManagement.getCookieName()] =
        databaseManagement.setCookieServer(result[0].id);
      res.send(result);
    }
  );
});

router.post("/", (req, res) => {
  databaseManagement.insertQuery("users", req.body, (resultA) => {
    databaseManagement.getEntityByColumn(
      "users",
      "id",
      resultA.insertId,
      (result) => {
        console.log("resilt: " + result);
        let obg = { ...req.body, id: resultA.insertedId };

        res.send(obg);
      }
    );
    console.log(`SERVER: mange to insert new user with id ${resultA.insertId}`);
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

router.put("/:id", (req, res) => {
  databaseManagement.updateEntityById(
    "users",
    req.params.id,
    req.body,
    (result) => {
      res.send(`mange to update user with id ${req.params.id}`);
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
