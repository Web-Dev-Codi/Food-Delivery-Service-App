import React from "react";
import { Link } from "react-router-dom";

// Mock Home screen for demonstration purposes
const HomeScreen = () => {
  return (
    <React.Fragment>
      HomeScreen
      <Link className="" to="/menu">
        Go to Demo Menu Page
      </Link>
    </React.Fragment>
  );
};

export default HomeScreen;
