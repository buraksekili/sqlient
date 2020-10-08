import React, { useState } from "react";
import ConnectionForm from "./ConnectionForm";
import QueryForm from "./QueryForm";
import { ResponseContext } from "./ResponseContext";
import Tables from "./Tables";

export default function App() {
  const [response, setResponse] = useState(undefined);

  return (
    <>
      <ResponseContext.Provider value={{ response, setResponse }}>
        <ConnectionForm />
        <QueryForm />
        <Tables />
      </ResponseContext.Provider>
    </>
  );
}
