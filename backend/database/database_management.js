const mysql = require("mysql");

function removeValidColumn(result) {
  result.forEach((element) => {
    if (element.valid) {
      delete element["valid"];
    }
  });
}

const runQuery = (query, callback) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "project_6",
    multipleStatements: true,
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
    removeValidColumn(result);
    callback(result);
  });
};

const getEntityByJoin = (
  table1,
  table2,
  column1,
  column2,
  targetColumn1,
  columnValue1,
  targetColumn2,
  columnValue2,
  callback
) => {
  let query = `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${table1}.${column1} = ${table2}.${column2} WHERE ${table1}.${targetColumn1} = '${columnValue1}' AND ${table2}.${targetColumn2} = '${columnValue2}' AND ${table1}.valid = TRUE AND ${table2}.valid = TRUE`;

  runQuery(query, function (err, result) {
    if (err) throw err;
    removeValidColumn(result);
    result.forEach((element) => {
      if (element.password) {
        delete element["password"];
      }
      if (element.userId) {
        delete element["userId"];
      }
    });
    callback(result);
  });
};

const insertQuery = (table, values, callback) => {
  let query;
  switch (table) {
    case "users":
      query = `INSERT INTO ${table} (username, email, companyName, city) VALUES ('${values.username}', '${values.email}', '${values.companyName}', '${values.city}');`;
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
    case "admins":
      query = `INSERT INTO ${table} (userId, isAdmin) VALUES ('${values.user_id}', '${values.is_admin}');)`;
      break;
    default:
      throw new Error(`cant find ${table} at database`);
  }
  runQuery(query, function (err, result) {
    if (err) throw err;
    callback(result);
    console.log("DATABASE: 1 record inserted");
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
    case "admins":
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
      query = `UPDATE ${table} SET username = '${values.username}', email = '${values.email}', companyName = '${values.companyName}', city = '${values.city}' WHERE id = ${id};`;
      break;
    case "todos":
      query = `UPDATE ${table} SET userId = '${values.userId}', title = '${
        values.title
      }', completed = '${Number(values.completed)}' WHERE id = ${id};`;
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
    case "admins":
      query = `UPDATE ${table} SET userId = '${values.user_id}', isAdmin = '${values.is_admin}' WHERE id = ${id};`;
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
exports.getEntityByJoin = getEntityByJoin;
