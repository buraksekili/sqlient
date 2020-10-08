import axios from "axios";
import React, { useContext } from "react";
import { ConnectionContext } from "./ConnectionContext";
import { ResponseContext, TableContext } from "./ResponseContext";

const Tables = ({ tables }) => {
  const { response } = useContext(ResponseContext);
  const { connectionInfo } = useContext(ConnectionContext);
  const { setTable } = useContext(TableContext);
  const getTableContent = (table) => {
    const data = { ...connectionInfo, table };
    axios
      .post("http://localhost:5000/table", { data })
      .then((res) => setTable(res.data.table_content))
      .catch((e) => console.log("error:dsa", e));
  };

  return (
    <div style={{ backgroundColor: "gray" }}>
      <h2>TABLES</h2>
      {response &&
        response.tables.map((table) => (
          <p key={table} onClick={() => getTableContent(table)}>
            {table}
          </p>
        ))}
    </div>
  );
};

export default Tables;
