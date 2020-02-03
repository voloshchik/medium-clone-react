import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import TopBar from "./components/topBar";

function App() {
  return (
    <Router>
      <h1>Welcom to hook</h1>
      <TopBar/>
      <Routes />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
