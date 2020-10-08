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

const establishConnection = (host, user, password, database, query) => {
  console.log(`${host} ${user} ${password} ${database}`);
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
      handleErrors(err);
      return;
    }
    alert("Connected!");
  });

  if (!query) return;
  connection.query(query, function (err, result) {
    if (err) {
      handleErrors(err);
      return;
    }
    console.log("1 record inserted");
  });
};

const handleErrors = (err) => {
  if (err) {
    console.log(JSON.stringify(err, undefined, 2));
    alert("Failed to connect DB");
    return;
  }
};

const displayTables = () => {
  const displayingTable = "SHOW TABLES;";
};

module.exports = establishConnection;
