import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//TODO check if "root" id exists, create a new one if needed.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
