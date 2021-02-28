import "./BranchSection.css";
import Landing from "./LandingSection/Landing";
import Calendar from "./Calendar/Calendar";
import Contributor from "./Contributor/Contributor";

function BranchSection(props) {
  return (
    <div className="branchsection">
      <Landing
        semesterID={props.semesterID}
        name={props.name}
        branch={props.branch}
        intro={props.intro}
      />
      <Calendar timetable={props.timetable} />
      <Contributor name={props.shortName} />
    </div>
  );
}
export default BranchSection;
