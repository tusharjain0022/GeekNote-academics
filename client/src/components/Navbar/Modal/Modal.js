import "./Modal.css";
import LoginBox from "./Login";
import SignupBox from "./Signup";
import OtpBox from "./Otp";

function ModalBox(props) {
  return (
    <div
      className="modal fade login-signup-modal"
      id="staticBackdrop"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        style={{
          position: "fixed",
          top: "0px",
          right: "25px",
          fontSize: "55px",
          color: "white",
        }}
      >
        <div aria-hidden="true">&times;</div>
      </button>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-body row ">
            <div className="col-lg-5 pl-0 pr-3 d-none d-lg-block">
              <div className="backgroundImage">
                <button
                  type="button"
                  class="close"
                  className="back-button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <p>Back</p>
                </button>

                <div className="introText">
                  {props.form === 0 && (
                    <p>
                      Welcome <br />
                      Back{" "}
                    </p>
                  )}
                  {props.form === 1 && (
                    <p>
                      Register <br />
                      Yourself{" "}
                    </p>
                  )}
                  {props.form === 2 && (
                    <p>
                      Change your <br />
                      Password{" "}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-7 loginSignupBox">
              {props.form === 0 && <LoginBox onChange={props.onChange} />}
              {props.form === 1 && <SignupBox onChange={props.onChange} />}
              {props.form === 2 && <OtpBox onChange={props.onChange} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// onClick={() => props.onChange(1)}
export default ModalBox;
