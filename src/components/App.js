import React, { useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import ConnectionForm from "./ConnectionForm";
import QueryForm from "./QueryForm";
import { ResponseContext, TableContext } from "./ResponseContext";
import "./style.css";
import Summary from "./Summary";

export default function App() {
  const [response, setResponse] = useState(undefined);
  const [table, setTable] = useState(undefined);
  const [connectionInfo, setConnectionInfo] = useState(undefined);

  return (
    <>
      <ConnectionContext.Provider value={{ connectionInfo, setConnectionInfo }}>
        <ResponseContext.Provider value={{ response, setResponse }}>
          <TableContext.Provider value={{ table, setTable }}>
            <ConnectionForm />
            <QueryForm />
            <Summary />
          </TableContext.Provider>
        </ResponseContext.Provider>
      </ConnectionContext.Provider>
    </>
  );
}
