import "./Contributor.css";
import mail from "../../../images/mail.svg";
import github from "../../../images/GitHub_logo.svg";
import instagram from "../../../images/Instagram_logo.svg";
import linkedin from "../../../images/LinkedIn_logo.svg";
import dev_adm_contri from "../../../data/dev_adm_contri.json";

function Contributor(props) {
  return (
    <>
      <div className="outer_div">
        <div className="left_div">
          <div className="left_div_text_out">
            <h1 className="text_left_div_in"> This Section is </h1>
            <h1 className="text_left_div_in"> Contributed By </h1>
          </div>
        </div>

        {/* Contributor's Detail to be add here   */}
        {dev_adm_contri.map((contributor_info, idx) => {
          if (contributor_info.contributor_at.includes(props.name)) {
            return (
              <div className="right_div">
                <div className="right_div_in">
                  <span className="rd_text">{contributor_info.name}</span>

                  <div className="Links">
                    <a href={contributor_info.githubLink} className="mr-3">
                      <img src={github} alt="github" />
                    </a>
                    <a href={contributor_info.linkedinLink} className="mr-3">
                      <img src={linkedin} alt="Dribbble" />
                    </a>
                    <a
                      href={"mailto:" + contributor_info.mail}
                      className="mr-3"
                    >
                      <img src={mail} alt="mail" />
                    </a>
                    {contributor_info.instaLink !== "null" && (
                      <a href={contributor_info.instaLink} className="mr-3">
                        <img src={instagram} alt="instagram" />
                      </a>
                    )}
                  </div>
                  <p className="dev-intro"> {contributor_info.intro}</p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
        {/* function ends here */}
      </div>
    </>
  );
}
export default Contributor;
