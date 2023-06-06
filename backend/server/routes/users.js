const databaseManagement = require("../../database/database_management.js");

const express = require("express");
const router = express.Router();

router.use(logger);

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

function logger(req, res, next) {
  console.log("SERVER", req.originalUrl);
  next();
}

module.exports = router;
