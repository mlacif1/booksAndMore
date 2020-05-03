import React from "react";
import "./css/style.css";
import { withRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import { Box } from "@material-ui/core";
import Navigation from "./components/Navigation/Navigation";

const App = props => {
  return (
    <Box>
      <Navigation selectedTab="home"/>
      <Home />
    </Box>
    
  );
};

export default withRouter(App);
