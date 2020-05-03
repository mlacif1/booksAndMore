import React from "react";
import { withRouter } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const BookSkeleton = (props) => {
  const styles = useStyles();

  return (
    <Box className={styles.skeleton}>
      <Skeleton variant="rect" width={100} height={100} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={150} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={100} />
    </Box>
  );
};

export default withRouter(BookSkeleton);

const useStyles = makeStyles((theme) => ({
  skeleton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 12px"
  },
}));
