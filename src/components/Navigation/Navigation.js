import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookOpen, faInfoCircle } from "@fortawesome/fontawesome-free-solid";
import { Box } from "@material-ui/core";

const Navigation = (props) => {
  const { selectedTab } = props;
  return (
    <Box className="menu-container">
      <Box
        className={`menu-item ${
          selectedTab === "home" ? "menu-item-selected" : ""
        }`}
      >
        <Link to="home">
          <FontAwesomeIcon
            icon={faHome}
            style={{
              marginRight: 4,
            }}
          />
          HOME
        </Link>
      </Box>
      <Box
        className={`menu-item ${
          selectedTab === "books" ? "menu-item-selected" : ""
        }`}
      >
        <Link to="books">
          <FontAwesomeIcon
            icon={faBookOpen}
            style={{
              marginRight: 4,
            }}
          />
          Books
        </Link>
      </Box>
      <Box
        className={`menu-item ${
          selectedTab === "about" ? "menu-item-selected" : ""
        }`}
      >
        <Link to="about">
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{
              marginRight: 4,
            }}
          />
          About
        </Link>
      </Box>
    </Box>
  );
};

export default withRouter(Navigation);
