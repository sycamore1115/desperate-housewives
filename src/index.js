import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import Part from "./part";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Part />
  </React.StrictMode>,
);
