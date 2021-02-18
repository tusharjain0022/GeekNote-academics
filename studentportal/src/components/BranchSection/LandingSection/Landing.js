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
              {props.name} Section
            </h1>
            <p>{props.intro}</p>
          </div>
        
      </div>

      <Resources name={props.name} />
    </>
  );
}
export default Landing;

