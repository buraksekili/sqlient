import axios from "axios";
import React, { useContext } from "react";
import { ConnectionContext } from "./ConnectionContext";
import { ResponseContext, TableContext } from "./ResponseContext";

const Tables = () => {
  const { response } = useContext(ResponseContext);
  const { connectionInfo } = useContext(ConnectionContext);
  const { setTable } = useContext(TableContext);

  const getTableContent = (table) => {
    setTable(undefined);
    const data = { ...connectionInfo, table };
    axios
      .post("http://localhost:5000/table", { data })
      .then((res) => {
        if (res.data && res.data.table_content) {
          setTable(res.data.table_content);
        }
      })
      .catch((e) => console.log("error:dsa", e));
  };

  return (
    <div>
      <h2>TABLES</h2>
      {response &&
        response.tables.map((table) => (
          <p
            className="table-link"
            key={table}
            onClick={() => getTableContent(table)}
          >
            {table}
          </p>
        ))}
    </div>
  );
};

export default Tables;
