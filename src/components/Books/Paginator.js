import React from "react";
import { Button, Box, makeStyles } from "@material-ui/core";

const Paginator = ({ currentPage, onPageChange, pageCount }) => {
  const styles = useStyles();

  const range = 2;
  const renderedPages = [...Array(range * 2 + 1).keys()]
    .map((i) => currentPage - range + i)
    .filter((i) => i > 0 && i <= pageCount);

  const showStart = currentPage - range > 1;
  const showEnd = currentPage + range < pageCount;
  return (
    <Box>
      {showStart && [
        <Button
          key="btn1-1"
          onClick={() => onPageChange(1)}
          className={`${currentPage === 1 && styles.buttonSelected}`}
        >
          1
        </Button>,
        <Button key="btn1-2">...</Button>,
      ]}
      {renderedPages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${currentPage === page && styles.buttonSelected}`}
        >
          {page}
        </Button>
      ))}
      {showEnd && [
        <Button key="btn3-1">...</Button>,
        <Button
          key="btn3-2"
          onClick={() => onPageChange(pageCount)}
          className={`${currentPage === pageCount && styles.buttonSelected}`}
        >
          {pageCount}
        </Button>,
      ]}
    </Box>
  );
};

export default Paginator;

const useStyles = makeStyles((theme) => ({
  buttonSelected: {
    backgroundColor: "#666",
    color: "white",
  },
}));
