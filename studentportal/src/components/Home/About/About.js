import "./About.css";
import React from "react";
import line from "../../../images/line.svg";
import hline from "../../../images/horline.svg";
import info from "../../../images/info.svg";
import "bootstrap/dist/css/bootstrap.css";

function About() {
  return (
    <div className="Aboutus container" id="about">
      <div className="row">
        <div className="line d-none d-lg-block">
          <img src={line} alt="line" className="line-pic"></img>
        </div>
        <div className="hline d-none d-lg-block">
          <img src={hline} alt="hline" className="hline-pic"></img>
        </div>
        <div className="col-12">
          <h1 className="heading">
            <img
              src={info}
              alt="logo"
              style={{
                width: "5.2vh",
                height: "5.2vh",
                margin: "5px 5px",
              }}
            ></img>{" "}
            About us
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12 about-content">
          <p>
            Our Website helps students by providing them appropriate resources
            presented in an organized manner. We've got all the resources that
            you'll require to excell in your academics.
          </p>
          <p>
            <span className="highlight">Our aim</span> is to guide student's to
            follow appropriate path with proper study materials and with all the
            pre-requsite knowledge to avoid all kind of confusion's across which
            most of the fresher's get stucked .
          </p>
          <p>
            <span className="highlight"></span> We would like to thanks all the
            developers, contributors and page admins for thier constant support
            making this aim succesful. We would like to give special thanks to
            Shitiz and Yash Pandey for thier initiative of blog space from which
            this project is inspired.You can ping any of the page admin
            requesting for any resource/section/notes that we missed to include
            here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
