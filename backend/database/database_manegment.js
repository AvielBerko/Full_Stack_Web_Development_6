const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
});

const runQuery = (query, callback) => {
  con.query(query, function (err, result) {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    console.log(`SQL command ${query} executed successfully`);
    callback(null, result);
  });
};


const insertQuery = (table, values) => {
    let query 
    if table == "users" {
        query = `INSERT INTO ${table} (${values.}, ${values.}, ${values.}, ${values.});`
    }
};
