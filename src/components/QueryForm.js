import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import { ResponseContext } from "./ResponseContext";

const buttonCSS = { marginLeft: 8, marginRight: 8, marginTop: 8, width: "15%" };

const QueryForm = () => {
  const [query, setQuery] = useState(undefined);
  const [helper, setHelper] = useState(undefined);
  const { connectionInfo } = useContext(ConnectionContext);
  const { response } = useContext(ResponseContext);

  // insert into product (productName,productPrice, productStock) values ('yeni',20, 50)

  const executeQuery = () => {
    const data = { ...connectionInfo, query };

    axios
      .post("http://localhost:5000/execute", { data })
      .then((res) => {
        if (res.data.error) {
          setHelper(res.data.error);
          return;
        } else if (res.data.status) {
          setHelper("Executed!");
        }
      })
      .catch((e) => console.log("eeee", e));
  };

  return (
    <div className="query-form">
      <TextField
        id="outlined-full-width"
        label="Query"
        style={{ margin: 8, width: "80%" }}
        placeholder="Your query:"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        helperText={helper && helper}
        onChange={(e) => setQuery(e.target.value)}
      />
      {response && query && (
        <Button
          style={buttonCSS}
          onClick={() => executeQuery()}
          variant="contained"
        >
          Execute
        </Button>
      )}
    </div>
  );
};

export default QueryForm;
