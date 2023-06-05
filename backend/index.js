const database_config = require("./database/database_initialization.js");
const express_server = require("./server/express_server.js");

database_config.test_init_connection();
database_config.create_database();
