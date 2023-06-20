const mysql = require("mysql");
const fs = require("fs");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  multipleStatements: true,
});

function run_sql_file(sql_path, callback) {
  data = fs.readFileSync(sql_path, "utf8");
  query = data.replace(/(\r\n|\n|\r)/gm, " ");

  con.query(query, function (err, result) {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }
    console.log(`DATABASE: SQL command ${query} executed successfully`);
    callback(null, result);
  });
}

const test_init_connection = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("DATABASE: Connected!");
  });
};

const create_database = () =>
  run_sql_file(
    "./backend/database/database_configuration.sql",
    (err, result) => {
      if (err) {
        console.error("DATABASE: Error:", err);
      } else {
        console.log("DATABASE: Query result:", result);
      }
    }
  );

const create_tables = (callback) => {
  run_sql_file("./backend/database/tables_configuration.sql", (err, result) => {
    if (err) {
      console.error("DATABASE: Error:", err);
    } else {
      console.log("DATABASE: Query result:", result);
      callback();
    }
  });
  con.end();
};

exports.create_database = create_database;
exports.test_init_connection = test_init_connection;
exports.create_tables = create_tables;
