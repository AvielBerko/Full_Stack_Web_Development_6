const fs = require('fs');
const mysql = require('mysql');

function run_sql_file(sql_path, connectionConfig, callback) {
  // Create a database connection
  const con = mysql.createConnection(connectionConfig);

  // Read the SQL file
  fs.readFile(sql_path, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      con.end(); // Close the database connection
      callback(err); // Notify the caller about the error
      return;
    }

    // Execute the SQL query
    con.query(data, function (err, result) {
      con.end(); // Close the database connection

      if (err) {
        console.error(err);
        callback(err); // Notify the caller about the error
        return;
      }

      console.log(`SQL command ${data} executed successfully`);
      callback(null, result); // Notify the caller about the successful execution
    });
  });
}

// Example usage
const sqlFile = "./backend/database/database_configuration.sql";
const connectionConfig = {
  host: 'localhost',
  user: 'username',
  password: '123123',
};

run_sql_file(sqlFile, connectionConfig, (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Query result:', result);
  }
});
