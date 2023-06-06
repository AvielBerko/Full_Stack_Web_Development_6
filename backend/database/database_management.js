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
      console.log(`DATABASE: SQL command ${query} executed successfully`);
      callback(null, result);
    });
  });
};

const getEntityByColumn = (table, columnName, columnValue, callback) => {
  let query = `SELECT * FROM ${table} WHERE ${columnName} = '${columnValue}' AND valid = TRUE`;

  runQuery(query, function (err, result) {
    if (err) throw err;
    callback(result);
  });
};

const insertQuery = (table, values, callback) => {
  let query;
  switch (table) {
    case "users":
      query = `INSERT INTO ${table} (username, email, company_name, city ) VALUES ('${values.username}', '${values.email}', '${values.company_name}', '${values.city}');`;
      break;
    case "todos":
      query = `INSERT INTO ${table} (userId, title) VALUES ('${values.user_id}', '${values.title}');`;
      break;
    case "posts":
      query = `INSERT INTO ${table} (userId, title, body) VALUES ('${values.user_id}', '${values.title}', '${values.body}');`;
      break;
    case "comments":
      query = `INSERT INTO ${table} (postId, name, email, body) VALUES ('${values.post_id}', '${values.name}', '${values.email}', '${values.body}');`;
      break;
    case "user_passwords":
      query = `INSERT INTO ${table} (userId, password) VALUES ('${values.user_id}', '${values.password}');`;
      break;

    default:
      throw new Error(`cant find ${table} at database`);
  }
  runQuery(query, function (err, result) {
    if (err) throw err;
    console.log("DATABASE: 1 record inserted, ID: " + result.insertId);
    callback(result);
  });
};

const deleteEntityById = (table, values, callback) => {
  let query;
  switch (table) {
    case "users":
      query = `UPDATE ${table} SET valid = FALSE WHERE id = ${values};`;
      break;
    case "todos":
      query = `UPDATE ${table} SET valid = FALSE WHERE id = ${values};`;
      break;
    case "posts":
      query = `UPDATE ${table} SET valid = FALSE WHERE id = ${values};`;
      break;
    case "comments":
      query = `UPDATE ${table} SET valid = FALSE WHERE id = ${values};`;
      break;
    case "user_passwords":
      query = `UPDATE ${table} SET valid = FALSE WHERE id = ${values};`;
      break;


    default:
      throw new Error(`cant find ${table} at database`);
  }
  runQuery(query, function (err, result) {
    if (err) throw err;
    console.log("DATABASE: " + result.affectedRows + " record(s) deleted");
    callback(result);
  });
};

const updateEntityById = (table, id, values, callback) => {
  let query;
  switch (table) {
    case "users":
      query = `UPDATE ${table} SET username = '${values.username}', email = '${values.email}', company_name = '${values.company_name}', city = '${values.city}' WHERE id = ${id};`;
      break;
    case "todos":
      query = `UPDATE ${table} SET userId = '${values.user_id}', title = '${values.title}', completed = '${values.completed}' WHERE id = ${id};`;
      break;
    case "posts":
      query = `UPDATE ${table} SET userId = '${values.user_id}', title = '${values.title}', body = '${values.body}' WHERE id = ${id};`;
      break;
    case "comments":
      query = `UPDATE ${table} SET postId = '${values.post_id}', name = '${values.name}', email = '${values.email}', body = '${values.body}' WHERE id = ${id};`;
      break;
    case "user_passwords":
      query = `UPDATE ${table} SET userId = '${values.user_id}', password = '${values.password}' WHERE id = ${id};`;
      break;

    default:
      throw new Error(`cant find ${table} at database`);
  }
  runQuery(query, function (err, result) {
    if (err) throw err;
    console.log("DATABASE: " + result.affectedRows + " record(s) updated");
    callback(result);
  });
};


exports.insertQuery = insertQuery;
exports.getEntityByColumn = getEntityByColumn;
exports.deleteEntityById = deleteEntityById;
exports.updateEntityById = updateEntityById;
