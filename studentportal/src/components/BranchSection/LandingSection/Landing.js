import React from "react";
import "./Landing.css";
import Resources from "../Resources/Resources.js";

function Landing(props) {
  return (
    <>
      <div className="landing-section">
        
          <div className="text_land">
            <h1
              
            >
              {props.branch.shortName} {props.year.name} {props.semester.semester} Semester Section
            </h1>
          </div>
        
      </div>

      <Resources branchName={props.branch.shortName} year={props.year.id} semesterName={props.semester.semester} />
    </>
  );
}
export default Landing;

