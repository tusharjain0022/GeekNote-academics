import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Documentation from "./components/Documentation/Documentation";
import branches from "./data/branches.json";
import BranchSection from "./components/BranchSection/BranchSection";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            {branches.map((obj) => {
              return obj.semester.map((sem) => {
                return (
                  <Route
                    exact
                    path={`${sem.link}`}
                    component={() => (
                      <BranchSection
                        semesterID={sem.id}
                        name={sem.name}
                        branch={obj.branch}
                        shortName={obj.name}
                        intro={sem.intro}
                        timetable={sem.timetable}
                      />
                    )}
                  />
                );
              });
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
