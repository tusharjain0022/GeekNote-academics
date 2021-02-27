import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Documentation from "./components/Documentation/Documentation";
import branch from "./data/branch.json";
import BranchSection from "./components/BranchSection/BranchSection";
import years from "./data/years.json";
import semesters from "./data/semesters.json";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            {branch.map((obj) => {
              return years.map((year) => {
                return semesters.map((sem) => {
                  return (
                    <Route exact path={`${obj.link}${year.link}${sem.link}`}
                      component={() => (
                        <BranchSection branch={obj} year={year} semester={sem}/>
                      )}
                      />
                    );
                });
              });
              })
            }
            
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
