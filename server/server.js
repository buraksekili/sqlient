const express = require("express");
const { establishConnection, execQuery } = require("./db");

const app = express();
app.use(express.json());

// Returns all tables available on database
app.post("/tables", (req, res) => {
  let { host, user, password, database, query } = req.body.data;
  if (!query) {
    query = `SHOW TABLES`;
  }

  const hostObj = { host, user, password, database, query };
  establishConnection(hostObj, (error, result) => {
    try {
      if (error) {
        res.set(401).send({ error: "Invalid credentials" });
        return;
      }
      res.send(result);
    } catch (e) {}
  });
});

// Executes query on database
app.post("/execute", (req, res) => {
  let { host, user, password, database, query } = req.body.data;
  const hostObj = { host, user, password, database, query };
  execQuery(hostObj, (error, result) => {
    if (error) {
      res.send({ error: error.message });
      return;
    }
    res.send(result);
  });
});

// shows content of selected table
app.post("/table", (req, res) => {
  const { host, user, password, database, table } = req.body.data;

  // Initialize query with tmp value, if there is no query indicated
  // server returns error.
  const query = "tmp";

  const hostObj = { host, user, password, database, query, table };
  establishConnection(hostObj, (error, result) => {
    if (error) {
      res.send(error.message);
      return;
    }
    res.send(result);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is on port:${port}`));
