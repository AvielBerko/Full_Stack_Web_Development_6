const mysql = require("mysql");

const runQuery = (query, callback) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "project_6",
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query(query, function (err, result) {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
      console.log(`SQL command ${query} executed successfully`);
      callback(null, result);
    });
  });
};

const insertQuery = (table, values) => {
  let query;
  switch (table) {
    case "users":
      query = `INSERT INTO ${table} (username, email, company_name, city ) VALUES ('${values.username}', '${values.email}', '${values.company_name}', '${values.city}');`;
      break;
    case "todos":
      query = `INSERT INTO ${table} (user_id, title) VALUES (${values.user_id}, ${values.title});`;
      break;
    case "posts":
      query = `INSERT INTO ${table} (user_id, title, body) VALUES (${values.user_id}, ${values.title}, ${values.body});`;
      break;
    case "comments":
      query = `INSERT INTO ${table} (post_id, name, email, body) VALUES (${values.post_id}, ${values.name}, ${values.email}, ${values.body});`;
      break;
    case "user_passwords":
      query = `INSERT INTO ${table} (user_id, password) VALUES (${values.user_id}, ${values.password});`;
      break;

    default:
      throw new Error(`cant find ${table} at database`);
  }
  runQuery(query, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
};

const getEntityByColumn = (table, columnName, columnValue) => {
  let query = `SELECT * FROM ${table} WHERE ${columnName} = '${columnValue}'`;

  runQuery(query, function (err, result) {
    if (err) throw err;
    return result;
  });
};

exports.insertQuery = insertQuery;
exports.getEntityByColumn = getEntityByColumn;