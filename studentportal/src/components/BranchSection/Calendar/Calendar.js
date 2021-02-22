import "./Calendar.css";
import React from "react";
import timetable from "../../../images/TT2CSE02.jpg";
import calendaricon from "../../../images/calendarIcon.svg";

function Calendar() {
  return (
    <div className="Calendar my-5">
      <div className="d-block d-sm-none col-12">
        <h4 style={{ color: "white", fontSize: "4vh", fontWeight: "400" }}>
          <img
            src={calendaricon}
            alt="logo"
            style={{ width: "3vh", marginRight: "10px" }}
          />{" "}
          Time Table{" "}
        </h4>
        <hr style={{ borderTop: "1.5px solid white ", width: "70%" }}></hr>
        <img src={timetable} alt="timetable" style={{ width: "95vw" }}></img>
      </div>
      <div className="d-none d-sm-block bigScreen">
        <h2 style={{ color: "white", fontSize: "6vh", fontWeight: "400" }}>
          <img
            src={calendaricon}
            alt="logo"
            style={{ width: "4vh", marginRight: "10px", marginBottom: "5px" }}
          />{" "}
          Time Table
        </h2>
        <hr style={{ borderTop: "1.5px solid white ", width: "70%" }}></hr>
        <img src={timetable} alt="timetable" style={{ width: "70vw" }}></img>
      </div>
    </div>
  );
}

export default Calendar;
