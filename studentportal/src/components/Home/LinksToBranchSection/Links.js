import "./Links.css";
import branches from "../../../data/branch.json";
import years from "../../../data/years.json";
import semesters from "../../../data/semesters.json";
import hline from "../../../images/horline.svg";
import attachment from "../../../images/attatchment.svg";

const Branch = (props) => {
  return (
    <div className="card resource-card">
      <a href={`${props.branch.link}${props.year.link}${props.semester.link}`}>
        <div className="cardContent">
          <div>
            <h3>{props.branch.shortName} {props.year.name} { props.semester.semester }</h3>
          </div>
          <p>Some dummy text</p>
        </div>
      </a>
    </div>
  );
};
function Links() {
  return (
    <section className="resource-section container">
      <div className="row">
        <div className="hline d-none d-lg-block">
          <img src={hline} alt="hline" className="hline-pic"></img>
        </div>
        <div className="col-12">
          <h1 className="heading">
            <img
              src={attachment}
              alt="logo"
              style={{
                width: "5vh",
                height: "5vh",
                margin: "5px 5px",
              }}
            />{" "}
            Resources
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12">
          <div className="allcards">
            <div className="cards">
              {branches.map((branch) => {
                return years.map((year) => {
                  return semesters.map((semester) => {
                    return <Branch key={`${branch.id}${year.id}${semester.id}`} branch={branch} year={year} semester={semester} />;
                  });
                });
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Links;
