import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import contact_logo from "./svg_img/contact_logo.svg";
import hline from "../../../images/horline.svg";
import DevModal from "./DevModal/DevModal.js";
import PageAdminModal from "./PageAdmin/PageAdmin.js";

function Contact() {
  return (
    <div className="contactus-section container mb-5" id="contact">
      <div className="row">
        <div className="hline d-none d-lg-block">
          <img src={hline} alt="hline" className="hline-pic"></img>
        </div>
        <div className="col-12">
          <h1 className="heading">
            <img
              src={contact_logo}
              alt="logo"
              style={{
                width: "5.228373702422146vh",
                height: "5.228373702422146vh",
                margin: "5px 5px",
              }}
            />{" "}
            Contact us
          </h1>
          <hr
            className="d-lg-none"
            style={{ borderTop: "1px solid #ccd6f6", width: "70%" }}
          ></hr>
        </div>
        <div className="col-12 col-md-6">
          <Card className=" page-admin">
            <Card.Body className="container card_contact">
              <div className="container">
                <Card.Title className="text-center ">
                  <h3>
                    Contact Page <br></br>Admins
                  </h3>
                </Card.Title>
                <hr style={{ borderTop: "1px solid white" }} />
                <Card.Text className="mt-4">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <hr style={{ borderTop: "1px solid white" }} />
                <button
                  type="button "
                  className="btn button_contact"
                  data-toggle="modal"
                  data-target="#adminModal"
                >
                  Contact Info
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <DevModal />

        <div className="col-12 col-md-6">
          <Card className=" developer">
            <Card.Body className="container card_contact">
              <div className="container">
                <Card.Title className="text-center ">
                  <h3>Contact Page Developers</h3>
                </Card.Title>
                <hr style={{ borderTop: "1px solid white" }} />
                <Card.Text className="mt-4">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </Card.Text>
                <hr style={{ borderTop: "1px solid white" }} />
                <button
                  type="button "
                  className="btn button_contact"
                  data-toggle="modal"
                  data-target="#devModal"
                >
                  Contact Info
                </button>
              </div>
            </Card.Body>
          </Card>
          <PageAdminModal />
        </div>
        <div className="col-12">
          <div className="text-center text-white">
            <p>
              <a href="/">Have any queries or suggestions ? </a>
              We would love to hear from you{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
