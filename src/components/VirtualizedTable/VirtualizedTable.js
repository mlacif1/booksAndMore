import React from "react";
import { Table, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import { Box } from "@material-ui/core";
import "./virtualizedTable.css";

const VirtualizedTable = (props) => {
  const { rows } = props;
  return (
    <Box className="table-container">
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            width={width}
            rowGetter={({ index }) => rows[index]}
            {...props}
          />
        )}
      </AutoSizer>
    </Box>
  );
};

export default VirtualizedTable;
