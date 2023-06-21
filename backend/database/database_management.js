const mysql = require("mysql");
let cookieManagement = {};

const setCookieServer = (userId) => {
  const cookie = Math.random().toString(36).substring(2, 15);
  cookieManagement[userId] = cookie;
  return cookie;
};

const getIdByCookie = (cookie) => {
  for (let key in cookieManagement) {
    if (cookieManagement[key] === cookie) {
      return key;
    }
  }
};

const getCookieByUserId = (userId) => {
  return cookieManagement[userId];
};

// const isAdmin() => {
//   return true;
// }

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

const getEntityByColumns = (
  table,
  columnName1,
  columnValue1,
  columnName2,
  columnValue2,
  callback
) => {
  let query = `SELECT * FROM ${table} WHERE ${columnName1} = '${columnValue1}' AND ${columnName2} = ${columnValue2} AND valid = TRUE`;

  runQuery(query, function (err, result) {
    if (err) throw err;
    removeValidColumn(result);
    callback(result);
  });
};

const getAllEntities = (table, callback) => {
  let query = `SELECT * FROM ${table}`;

  runQuery(query, function (err, result) {
    if (err) throw err;
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
      query = `INSERT INTO ${table} (username, email, companyName, city) VALUES ('${values.username}', '${values.email}', '${values.companyName}', '${values.city}'); INSERT INTO roles (userId, isAdmin) VALUES (LAST_INSERT_ID(), FALSE);`;
      break;
    case "todos":
      query = `INSERT INTO ${table} (userId, title) VALUES ('${values.userId}', '${values.title}');`;
      break;
    case "posts":
      query = `INSERT INTO ${table} (userId, title, body) VALUES ('${values.userId}', '${values.title}', '${values.body}');`;
      break;
    case "comments":
      query = `INSERT INTO ${table} (postId, name, email, body) VALUES ('${values.postId}', '${values.name}', '${values.email}', '${values.body}');`;
      break;
    case "user_passwords":
      query = `INSERT INTO ${table} (userId, password) VALUES ('${values.userId}', '${values.password}');`;
      break;
    case "roles":
      query = `INSERT INTO ${table} (userId, isAdmin) VALUES ('${values.userId}', '${values.isAdmin}');)`;
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
    case "roles":
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
      query = `UPDATE ${table} SET userId = '${values.userId}', title = '${values.title}', body = '${values.body}' WHERE id = ${id};`;
      break;
    case "comments":
      query = `UPDATE ${table} SET postId = '${values.postId}', name = '${values.name}', email = '${values.email}', body = '${values.body}' WHERE id = ${id};`;
      break;
    case "user_passwords":
      query = `UPDATE ${table} SET userId = '${values.userId}', password = '${values.password}' WHERE id = ${id};`;
      break;
    case "roles":
      query = `UPDATE ${table} SET userId = '${values.userId}', isAdmin = '${values.isAdmin}' WHERE id = ${id};`;
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
exports.setCookieServer = setCookieServer;
exports.getIdByCookie = getIdByCookie;
exports.getCookieByUserId = getCookieByUserId;
exports.getAllEntities = getAllEntities;
exports.getEntityByColumns = getEntityByColumns;
