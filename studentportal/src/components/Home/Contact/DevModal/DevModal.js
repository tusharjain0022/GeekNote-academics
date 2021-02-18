import mail from "../../../../images/mail.svg";
import github from "../../../../images/GitHub_logo.svg";
import instagram from "../../../../images/Instagram_logo.svg";
import linkedin from "../../../../images/LinkedIn_logo.svg";
import "./DevModal.css";
import dev_adm_contri from "../../../../data/dev_adm_contri.json";

function DevModal() {
  return (
    <div
      className="modal fade devmodal"
      id="devModal"
      tabIndex="-1"
      aria-labelledby="devModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content container">
          <div className="row">
            <div className="col-12 header">
              <h5 className=" modal-title mb-5">GeekNote Developers Team</h5>

              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <hr
                style={{ borderTop: "1px solid   #ccd6f6", width: "70%" }}
              ></hr>
            </div>

            {/* rendering developer's here */}
            {dev_adm_contri.map((dev_info, idx) => {
              if (dev_info.developer === true) {
                return (
                  <div className="col-12 px-5 my-3" key={`${idx}`}>
                    <div className="row">
                      <img
                        className={
                          dev_info.id % 2 === 0
                            ? "col-12 col-lg-4  align-self-center dev-images"
                            : "col-12 col-lg-4  align-self-center dev-images order-lg-2"
                        }
                        src={dev_info.image}
                        alt="tushar"
                      ></img>
                      <div
                        className={
                          dev_info.id % 2 === 0
                            ? "dev-text-box col-12 col-lg-8"
                            : "dev-text-box col-12 col-lg-8 order-lg-1"
                        }
                      >
                        <h4 className="mt-3">{dev_info.name}</h4>
                        <p className="dev-intro"> {dev_info.intro}</p>
                        <div className="Links">
                          <a href={dev_info.githubLink} className="mr-3">
                            <img src={github} alt="github" />
                          </a>
                          <a href={dev_info.linkedinLink} className="mr-3">
                            <img src={linkedin} alt="Dribbble" />
                          </a>
                          <a href={"mailto:" + dev_info.mail} className="mr-3">
                            <img src={mail} alt="mail" />
                          </a>
                          {dev_info.instaLink !== "null" && (
                            <a href={dev_info.instaLink} className="mr-3">
                              <img src={instagram} alt="instagram" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {/* function ends here */}

            <div className="col-12 mt-5">
              <div className="text-center text-white">
                <p>
                  <a href="/">Have any queries or suggestions ? </a>
                  We would love to hear from you{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevModal;
