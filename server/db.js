// https://www.sitepoint.com/using-node-mysql-javascript-client/

// For client doesn't support authentication protocl errors:
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// xecute the following query in MYSQL Workbench
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// Where root as your user localhost as your URL and password as your password
// Then run this query to refresh privileges:
// flush privileges;

// Try connecting using node after you do so.
// If that doesn't work, try it without @'localhost' part.

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123burak",
//   database: "mysqldb",

const mysql = require("mysql");

const establishConnection = (
  { host, user, password, database, query },
  callback
) => {
  connectionConfig = {
    host: "localhost",
    user: "root",
    password: "123burak",
    database: "mysqldb",
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
        console.log(element);
        res.push(element);
        return element;
      });
      callback(null, { status: true, table_content: res });
    }
  });

  connection.end();
};

module.exports = establishConnection;
