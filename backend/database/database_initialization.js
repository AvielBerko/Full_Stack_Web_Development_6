const mysql = require("mysql");
const fs = require("fs");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
});

function run_sql_file(sql_path, callback) {
  fs.readFile(sql_path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    data = data.replace(/(\r\n|\n|\r)/gm, " ");
    all_queries = data.split(";").slice(0, -1);;
    console.log(all_queries);

    all_queries.forEach((element) => {
      con.query(element, function (err, result) {
        if (err) {
          console.error(err);
          callback(err);
          return;
        }

        console.log(`SQL command ${element} executed successfully`);
        callback(null, result);
      });
    });
  });
}

const test_init_connection = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
};

const create_database = () =>
  run_sql_file(
    "./backend/database/database_configuration.sql",
    (err, result) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Query result:", result);
      }
    }
  );

exports.create_database = create_database;
exports.test_init_connection = test_init_connection;