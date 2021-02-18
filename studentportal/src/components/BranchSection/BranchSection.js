import "./BranchSection.css";
import Landing from "./LandingSection/Landing";
// import LinkedBlog from "./LinkedBlog/LinkedBlog";
import Calendar from "./Calendar/Calendar";
import Contributor from "./Contributor/Contributor";

function BranchSection(props) {
  return (
    <div className="branchsection">
      <Landing name={props.name} intro={props.intro} />
      {/* <LinkedBlog name={props.name} /> */}
      <Calendar />
      <Contributor name={props.name} />
    </div>
  );
}
export default BranchSection;
