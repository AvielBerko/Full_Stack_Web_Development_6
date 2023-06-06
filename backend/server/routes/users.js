const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

router.get("/", (req, res) => {
  // return all users
  res.send("hello from users");
});

router.get("/:name", (req, res) => {
  data = databaseManagement.getEntityByColumn(
    "users",
    "username",
    req.params.name,
    (result) => {
      res.send(result[0]);
    }
  );
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
