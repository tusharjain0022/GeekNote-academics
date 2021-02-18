import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import BranchSection from "./components/BranchSection/BranchSection";
import Documentation from "./components/Documentation/Documentation";
import branches from "./data/branches.json";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            {branches.map((obj) => {
              return (
                <Route
                  exact
                  path={obj.link}
                  component={() => (
                    <BranchSection name={obj.name} intro={obj.intro} />
                  )}
                />
              );
            })}
            <Route
              exact
              path="/terms-and-policy"
              component={() => <Documentation name="Terms and Policy" />}
            />
            <Route path="/" component={Error} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
