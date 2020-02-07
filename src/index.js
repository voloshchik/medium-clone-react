import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import TopBar from "./components/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";
import CurrentUserChekcer from './components/currentUserChekcer';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChekcer>
        <Router>
          <h1>Welcom to hook</h1>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChekcer>
    </CurrentUserProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
