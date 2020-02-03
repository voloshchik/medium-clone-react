import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <div>
      <h1>Hellow hook</h1>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <Routes>
      <App />
    </Routes>
  </Router>,
  document.getElementById("root")
);
