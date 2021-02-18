import "./Links.css";
import branches from "../../../data/branches.json";
import hline from "../../../images/horline.svg";
import attachment from "../../../images/attatchment.svg";

const Branch = ({ name, intro, link }) => {
  return (
    <div className="card resource-card">
      <a href={link}>
        <div className="cardContent">
          <div>
            <h3>{name}</h3>
          </div>
          <p>{intro}</p>
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
                width: "5.228373702422146vh",
                height: "5.228373702422146vh",
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
                return <Branch key={branch.id} {...branch} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Links;
