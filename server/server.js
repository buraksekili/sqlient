const express = require("express");
const establishConnection = require("./db");

const app = express();
app.use(express.json());

app.post("/tables", (req, res) => {
  const { host, user, password, database } = req.body.data;
  const query = `use ${database}; SHOW TABLES;`;
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
