import React from "react";
import "./Resources.css";
import { Accordion, Card } from "react-bootstrap";
import syllabus from "../../../data/syllabus.json";
import pin from "./svg_img/pin.svg";
import notes from "./svg_img/notes.svg";
import speaker from "./svg_img/speaker.svg";

// Styling to be done in SubjectCard Component

const SubjectCard = (props) => {
  return (
    <>
      <Accordion defaultActiveKey="1">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className="subject_name"
          >
            <div className="ml-5 text-center"> {props.sub_name} </div>
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
  return (
    <>
      <div className="resource_heading ">
        <h1 className="sub_resource_heading">
          <img src={pin} alt="logo" />{" "}
          <div className="ml-3 text-white">Resources</div>
        </h1>
      </div>
      {syllabus.map((props) => {
        if (props.name === props_name.name) {
          return <CallMe key={props.id} {...props} />;
        } else {
          return null;
        }
      })}
    </>
  );
}
export default Resources;
