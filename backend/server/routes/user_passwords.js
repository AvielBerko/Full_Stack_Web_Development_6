const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  databaseManagement.isAdminByCookie(req.query.p6Cookie, (result) => {
    if (result) {
      databaseManagement.getAllEntities("user_passwords", (result) => {
        res.send(result);
      });
    } else {
      res.status(304).send("you are not admin");
    }
  });
});

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
      if (result.length == 1) {
        req.body.user_id = result[0].id;
        databaseManagement.insertQuery("user_passwords", req.body, (result) => {
          databaseManagement.getEntityByColumn(
            "user_passwords",
            "id",
            result.insertId,
            (result) => {
              result[0].p6Cookie = databaseManagement.setCookieServer(
                result[0].id
              );
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
  databaseManagement.isAdminByCookie(req.query.p6Cookie, (result) => {
    if (result) {
      databaseManagement.updateEntityById(
        "user_passwords",
        req.params.id,
        req.body,
        (result) => {
          res.send(req.body);
        }
      );
    } else {
      res.status(304).send("you are not admin");
    }
  });
});

router.delete("/:id", (req, res) => {
  databaseManagement.isAdminByCookie(req.query.p6Cookie, (result) => {
    if (result) {
      databaseManagement.deleteEntityById(
        "user_passwords",
        req.params.id,
        (result) => {
          res.send(`mange to delete user_passwords with id ${req.params.id}`);
        }
      );
    } else {
      res.status(304).send("you are not admin");
    }
  });
});

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
