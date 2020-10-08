import React, { useContext, useState } from "react";
import ReactFlexyTable from "react-flexy-table";
import { TableContext } from "./ResponseContext";

const TableContent = ({ contents }) => {
  console.log("tablecontent: ", contents);
  const [keys, setKeys] = useState(undefined);
  const { table } = useContext(TableContext);

  const handleKeys = (row) => {
    setKeys(Object.keys(row));
  };

  return (
    <>
      <div>
        {table && (
          <ReactFlexyTable data={table} className='my-table' sortable filterable globalSearch />
        )}
      </div>
    </>
  );
};

export default TableContent;
