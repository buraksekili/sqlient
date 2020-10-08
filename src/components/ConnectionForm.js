import TextField from "@material-ui/core/TextField";
import React from "react";

const MARGIN = 8;

export default function ConnectionForm() {
  return (
    <div className="connection-form-div">
      <TextField
        defaultValue="localhost"
        style={{ margin: MARGIN }}
        required
        id="con_url"
        label="URL"
      />
      <TextField
        defaultValue="root"
        style={{ margin: MARGIN }}
        id="user"
        required
        label="USER"
      />
      <TextField
        id="filled-password-input"
        label="Password"
        style={{ margin: MARGIN }}
        type="password"
        autoComplete="current-password"
      />
      <TextField
        required
        defaultValue="mysqldb"
        style={{ margin: MARGIN }}
        id="outlined-basic"
        label="DB NAME"
      />
    </div>
  );
}
