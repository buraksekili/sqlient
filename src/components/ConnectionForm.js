import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import LoadingSpinner from "./LoadingSpinner";
import { ResponseContext } from "./ResponseContext";

// MARGIN constant for ConnectionForm TextField.
const MARGIN = 8;

export default function ConnectionForm() {
  const [url, setUrl] = useState("localhost");
  const [user, setUser] = useState("root");
  const [password, setPassword] = useState("123burak");
  const [dbName, setDbName] = useState("mysqldb");
  const [isLoading, setIsLoading] = useState(undefined);
  const [helper, setHelper] = useState(undefined);

  const { setResponse } = useContext(ResponseContext);
  const { setConnectionInfo } = useContext(ConnectionContext);

  const connectDb = () => {
    const data = { host: url, user, password, database: dbName };
    setConnectionInfo(data);
    axios
      .post("http://localhost:5000/tables", { data })
      .then((res) => {
        if (res.data.error) {
          setHelper(res.data.error);
          setIsLoading(false);
          return;
        }
        setResponse(res.data);
        setIsLoading(false);
        setHelper("Successful");
      })
      .catch((e) => {
        setIsLoading(false);
        console.error(e);
      });
  };

  return (
    <div className="connection-form-div">
      <Box display="flex" flexDirection="row" p={1} m={1}>
        <TextField
          defaultValue="localhost"
          style={{ margin: MARGIN }}
          required
          id="con_url"
          label="URL"
          helperText={helper && helper}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          defaultValue="root"
          style={{ margin: MARGIN }}
          id="user"
          required
          label="USER"
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          defaultValue="123burak"
          id="filled-password-input"
          label="Password"
          style={{ margin: MARGIN }}
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          defaultValue="mysqldb"
          style={{ margin: MARGIN }}
          id="outlined-basic"
          label="DB NAME"
          onChange={(e) => setDbName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            connectDb();
            setIsLoading(true);
          }}
        >
          Check Db
        </Button>
      </Box>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
