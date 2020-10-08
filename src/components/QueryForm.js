import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";

const buttonCSS = { marginLeft: 8, marginRight: 8, marginTop: 8, width: "16%" };

const QueryForm = () => {
  return (
    <div className="query-form">
      <TextField
        id="outlined-full-width"
        label="Query"
        style={{ margin: 8, width: "80%" }}
        placeholder="Your query:"
        // fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <Button style={buttonCSS} variant="contained">
        Execute
      </Button>
    </div>
  );
};

export default QueryForm;
