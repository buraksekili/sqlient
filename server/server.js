const express = require("express");
const { establishConnection, execQuery } = require("./db");

const app = express();
app.use(express.json());

app.post("/tables", (req, res) => {
  let { host, user, password, database, query } = req.body.data;
  if (!query) {
    query = `use ${database}; SHOW TABLES;`;
  }
  const hostObj = { host, user, password, database, query };
  establishConnection(hostObj, (error, result) => {
    try {
      if (error) {
        console.log("ERROR:!");
        res.set(401).send({ error: "Invalid credentials" });
        return;
      }
      res.send(result);
    } catch (e) {}
  });
});

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

app.post("/table", (req, res) => {
  const { host, user, password, database, table } = req.body.data;
  const query = `SELECT * FROM ${table}`;
  establishConnection(
    { host, user, password, database, query },
    (error, result) => {
      if (error) {
        res.send(error.message);
        return;
      }
      res.send(result);
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is on port:${port}`));
