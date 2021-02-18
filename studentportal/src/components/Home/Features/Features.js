import "./Features.css";
import hline from "../../../images/horline.svg";
import attachment from "../../../images/attatchment.svg";
// import line from "../../../images/line.svg";

function Features() {
  return (
    <div className="feature-section container">
      <div className="row">
        {/* <div className="line d-none d-lg-block">
          <img src={line} alt="line" className="line-pic"></img>
        </div> */}
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
            Getting Started
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12 ">
          <div className="iframe-home">
            {
              <iframe
                title="getting started"
                src="https://www.youtube.com/embed/jOYR3k1VhUQ?controls=0&start=41&loop=1"
                style={{ width: "100%", height: "100%" }}
              ></iframe>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Features;
