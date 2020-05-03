import React from "react";
import { withRouter } from "react-router-dom";
import { Box, Paper, makeStyles, Typography } from "@material-ui/core";

const Home = (props) => {
  const styles = useStyles();

  return (
    <Box className={styles.boxContainer}>
      <Paper elevation={5} className={styles.paperContainer}>
        <Typography className={styles.text}>
          Welcome to the Book Store
        </Typography>
        <Typography className={styles.text}>
          Here you can find all the books worth reading
        </Typography>
        <Typography className={styles.text}>
          Grab yourself a hot/cold beverage, make yourself comfortable and 
          let's start reading. Home isolation should not be boring.
        </Typography>
      </Paper>
    </Box>
  );
};

export default withRouter(Home);

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  paperContainer: {
    width: 400,
    margin: 12,
    padding: 16,
    textAlign: "center"
  },
  text: {
    margin: "12px 0",
    color: "#555",
    fontFamily: `"Open Sans", sans-serif`
  }
})
);
