import "./BranchSection.css";
import Landing from "./LandingSection/Landing";
import Calendar from "./Calendar/Calendar";
import Contributor from "./Contributor/Contributor";

function BranchSection(props) {
  return (
    <div className="branchsection">
      <Landing branch={props.branch} year={props.year} semester={props.semester} />
      <Calendar branch={props.branch} year={props.year} semester={props.semester}/>
      <Contributor branch={props.branch.shortName} year={props.year.id} semester={props.semester} />
    </div>
  );
}
export default BranchSection;
