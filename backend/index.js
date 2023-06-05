const database_config = require("./database/database_initialization.js");
const databaseManagement = require("./database/database_management.js");
const express_server = require("./server/express_server.js");

database_config.create_tables();

// databaseManagement.insertQuery("users", {
//   username: "test_insertQuery",
//   email: "email_insertQuery",
//   company_name: "company_insertQuery",
//   city: "city_insertQuery",
// });

// databaseManagement.getEntityByColumn("users", "username", "test_insertQuery");
// databaseManagement.getEntityByColumn("users", "username", "username1");

