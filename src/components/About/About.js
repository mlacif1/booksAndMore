import React from "react";
import { withRouter } from "react-router-dom";
import { Box, Paper, makeStyles, Typography } from "@material-ui/core";
import Navigation from "../Navigation/Navigation";

const About = (props) => {
  const styles = useStyles();

  return (
    <Box>
      <Navigation selectedTab="about" />
      <Box className={styles.boxContainer}>
        <Paper elevation={5} className={styles.paperContainer}>
          <Typography className={styles.text}>About our Book Store</Typography>
          <Typography className={styles.text}>We are fast</Typography>
          <Typography className={styles.text}>We deal with big data</Typography>
          <Typography className={styles.text}>
            About page placeholder...
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default withRouter(About);

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    justifyContent: "center"
  },
  paperContainer: {
    width: "80%",
    margin: 12,
    padding: 16,
    textAlign: "center",
  },
  text: {
    margin: "12px 0",
    color: "#555",
    fontFamily: `"Open Sans", sans-serif`,
  },
}));
