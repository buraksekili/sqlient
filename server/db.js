// For client doesn't support authentication protocl errors:
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

const mysql = require("mysql");

/**
 * Database connection credentials.
 * @typedef {Object} Host
 * @property {string} host - Address of the db. default: localhost
 * @property {string} user - User to login db
 * @property {number} password - Password to login db
 * @property {number} database - Database name
 * @property {number} query - Query to execute on db.
 * @property {number} table - (optional)
 */

/**
 * Callback to indicate status of async MySQL operations.
 *
 * @callback mySQLStatus
 * @param {string} error - Error to show in client.
 * @param {Object} response - JSON response that includes information about query result.
 */

/**
 * Establishes connection and fetches tables and content of
 * particular table from database indicated by user input.
 *
 * @param {Host} hostObj - Credentials to connect db.
 * @param {mySQLStatus} callback - Callback function that indicates result of query execution.
 *
 */
const establishConnection = (hostObj, callback) => {
  const { host, user, password, database, query, table } = hostObj;

  // Set the connection config object
  connectionConfig = {
    host,
    user,
    password,
    database,
    multipleStatements: true,
  };

  // Establish connection
  const connection = mysql.createConnection(connectionConfig);

  // check connection status
  connection.connect((err) => {
    if (err) {
      callback(new Error("Invalid credentials"), undefined);
      return;
    }

    // If there is no query indicated, just show
    // status of connection (successful or not)
    if (!query) {
      callback(null, { status: true, tables: undefined });
    }
  });

  // If query is not specified.
  if (!query) {
    return;
  }

  if (query.includes("SHOW TABLES")) {
    connection.query("USE ??; SHOW TABLES", [database], (err, result) => {
      if (err) {
        callback(new Error(err.message), undefined);
        return;
      }

      const tables = result[1].map((table) => table.Tables_in_mysqldb);
      callback(null, { status: true, tables });
    });
  } else {
    connection.query("SELECT * FROM ??", [table], (err, result) => {
      if (err) {
        callback(new Error(err.message), undefined);
        return;
      }

      const res = [];
      result.forEach((element) => {
        res.push(element);
        return element;
      });
      callback(null, { status: true, table_content: res });
    });
  }

  // Close connection.
  connection.end();
};

/**
 * Executes incoming queries on db
 *
 * @param {Host} hostObj - Credentials to connect db.
 * @param {mySQLStatus} callback - Callback function that indicates result of query execution.
 */
const execQuery = (hostObj, callback) => {
  const { host, user, password, database, query } = hostObj;

  connectionConfig = {
    host,
    user,
    password,
    database,
    multipleStatements: true,
  };
  const connection = mysql.createConnection(connectionConfig);

  connection.connect((err) => {
    if (err) {
      callback(new Error(err.message), undefined);
      return;
    }
    if (!query) {
      callback(null, { status: true, tables: undefined });
    }
  });

  if (!query) {
    callback(new Error("Invalid query"), undefined);
    return;
  }
  connection.query(query, (err, result) => {
    if (err) {
      callback(new Error("Invalid query"), undefined);
      return;
    }
    const res = [];
    if (result.constructor.name == "OkPacket") {
      res.push(result);
    }
    callback(null, { status: true, table_content: res });
  });

  connection.end();
};

module.exports = { establishConnection, execQuery };
