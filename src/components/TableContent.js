import React, { useContext, useState } from "react";
import ReactFlexyTable from "react-flexy-table";
import "react-flexy-table/dist/index.css";
import { TableContext } from "./ResponseContext";

const TableContent = () => {
  const { table } = useContext(TableContext);

  return (
    <>
      <div className="table-content">
        {table && (
          <ReactFlexyTable data={table} sortable filterable globalSearch />
        )}
      </div>
    </>
  );
};

export default TableContent;
