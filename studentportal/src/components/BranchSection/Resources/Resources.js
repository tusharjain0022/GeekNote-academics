import React, { useState } from "react";
import "./Resources.css";
import { Accordion, Card } from "react-bootstrap";
import pin from "./svg_img/pin.svg";
import notes from "./svg_img/notes.svg";
import CSEsyllabus from "../../../data/cse_syllabus.json";
import ECEsyllabus from "../../../data/ece_syllabus.json";
import speaker from "./svg_img/speaker.svg";
import down_arrow from "./svg_img/down_arrow.svg";
import up_arrow from "./svg_img/up_arrow.svg";

// Styling to be done in SubjectCard Component

const SubjectCard = (props) => {
  const [arrow, setArrow] = useState(down_arrow);

  function RotateArrow() {
    if (arrow === down_arrow) setArrow(up_arrow);
    else setArrow(down_arrow);
  }

  return (
    <>
      <Accordion defaultActiveKey="1" style={{ marginTop: "5px" }}>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className="subject_name"
            onClick={RotateArrow}
          >
            <div className="subject_heading_name" style={{ color: "white" }}>
              {" "}
              {props.sub_name}{" "}
            </div>
            <img
              className="subject_heading_image"
              src={arrow}
              alt="down_arrow"
            />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="inside_card">
              <div className="learn_notes">
                <h3 className="learn_notes_heading">
                  <img src={notes} alt="logo" /> Learning Notes
                </h3>
                <div>
                  {props.learning_notes.map((learn_list) => {
                    return (
                      <li>
                        <a
                          href={learn_list.ref_link}
                          style={{ color: "black" }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {learn_list.title}
                        </a>
                      </li>
                    );
                  })}
                </div>
              </div>
              <br />
              <div className="learn_videos">
                <h3 className="learn_notes_heading">
                  <img src={speaker} alt="logo" /> Learning Videos
                </h3>
                {props.learning_videos.map((learn_list) => {
                  return (
                    <li>
                      <a href={learn_list.ref_link} style={{ color: "black" }}>
                        {learn_list.title}
                      </a>
                    </li>
                  );
                })}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

const CallMe = (props) => {
  return (
    <>
      {props.subjects.map((sub_prop) => {
        return <SubjectCard id={sub_prop.id} {...sub_prop} />;
      })}
    </>
  );
};

function Resources(props_name) {
  console.log(props_name.semesterID);
  return (
    <>
      <div className="resource_heading ">
        <h1 className="sub_resource_heading">
          <img src={pin} alt="logo" />{" "}
          <div className="ml-3 text-white">Resources</div>
        </h1>
      </div>
      {(props_name.branch === "CSE" ? CSEsyllabus : ECEsyllabus).map(
        (props) => {
          if (props.id === props_name.semesterID) {
            return <CallMe key={props.id} {...props} />;
          } else {
            return null;
          }
        }
      )}
    </>
  );
}
export default Resources;
