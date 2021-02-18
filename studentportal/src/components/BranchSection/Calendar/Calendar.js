import "./Calendar.css";
import React from "react";
// import timetable from "../../../images/TT.jpg";

function Calendar() {
  return (
    <div className="Calendar">
      <div className="d-block d-sm-none col-12">
        <h4 style={{ color: "white" }}>Time Table </h4>
        {/* <img src={timetable}></img> */}
      </div>
      <div className="d-none d-sm-block bigScreen">
        <h2 style={{ color: "white" }}>Time Table</h2>
        {/* <img src={timetable}></img> */}
      </div>
    </div>
  );
}

export default Calendar;
