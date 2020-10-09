// For client doesn't support authentication protocl errors:
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

const mysql = require("mysql");

const establishConnection = (hostObj, callback) => {
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
      callback(new Error("Invalid credentials"), undefined);
      return;
    }
    if (!query) {
      callback(null, { status: true, tables: undefined });
    }
  });

  // If query is not specified.
  if (!query) return;
  connection.query(query, (err, result) => {
    if (err) {
      callback(new Error(err.message), undefined);
      return;
    }
    if (query.includes("SHOW TABLES")) {
      const tables = result[1].map((table) => table.Tables_in_mysqldb);
      callback(null, { status: true, tables });
    } else {
      const res = [];
      result.forEach((element) => {
        res.push(element);
        return element;
      });
      callback(null, { status: true, table_content: res });
    }
  });

  connection.end();
};

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
