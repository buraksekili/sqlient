// Summary screen for db information

import Box from "@material-ui/core/Box";
import React from "react";
import TableContent from "./TableContent";
import Tables from "./Tables";

const Summary = () => {
  return (
    <div>
      <Box display="flex" flexDirection="row"  m={1}>
        <Tables />
        <TableContent />
      </Box>
    </div>
  );
};

export default Summary;
