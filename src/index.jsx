import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/Root";

ReactDOM.render(
  <Root numPoints={100} color="#fff" thickness={2} />,
  document.getElementById("ghostwriter")
);