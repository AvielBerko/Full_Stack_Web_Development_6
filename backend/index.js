const database_config = require("./database/database_initialization.js");
const databaseManagement = require("./database/database_management.js");

database_config.create_tables(() => {
  require("./server/express_server.js");
  console.log("server is up and running");
});

setTimeout(
  () =>
    databaseManagement.insertQuery(
      "users",
      {
        username: "test_insertQuery",
        email: "email_insertQuery",
        companyName: "company_insertQuery",
        city: "city_insertQuery",
        password: "password_insertQuery",
      },
      (result) => {
        console.log(result);
      }
    ),
  1000
);
