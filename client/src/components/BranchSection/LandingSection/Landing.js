import React from "react";
import "./Landing.css";
import Resources from "../Resources/Resources.js";

function Landing(props) {
  return (
    <>
      <div className="landing-section">
        <div className="text_land">
          <h1>{props.name} Semester Section</h1>
          <p>{props.intro}</p>
        </div>
      </div>

      <Resources
        semesterID={props.semesterID}
        name={props.name}
        branch={props.branch}
      />
    </>
  );
}
export default Landing;
