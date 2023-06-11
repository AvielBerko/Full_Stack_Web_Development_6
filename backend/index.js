const database_config = require("./database/database_initialization.js");
const databaseManagement = require("./database/database_management.js");
const express_server = require("./server/express_server.js");

database_config.create_tables();

setTimeout(
  () =>
    databaseManagement.insertQuery(
      "users",
      {
        username: "test_insertQuery",
        email: "email_insertQuery",
        company_name: "company_insertQuery",
        city: "city_insertQuery",
        password: "password_insertQuery",
      },
      (result) => {
        console.log(result);
      }
    ),
  1000
);

setTimeout(
  () =>
    databaseManagement.getEntityByColumn(
      "users",
      "username",
      "test_insertQuery",
      (result) => {
        console.log(result);
      }
    ),
  1500
);
