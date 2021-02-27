import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css";
import Form from "react-bootstrap/Form";
import youtube from "./Youtube.svg";
import instagram from "./Instagram.svg";
import twitter from "./Twitter.svg";
import dribble from "./Dribbble.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="main-footer pb-sm-4">
      <div className="container containerclass">
        <div className="row">
          {/* Column1 */}
          <div className="col-12 col-sm-3">
            <div className="Option">
              <h4
                style={{
                  fontFamily: "Manrope",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "22px",
                  color: "#fbbc04",
                  marginLeft: "10px",
                }}
              >
                GeekNote
                <span
                  style={{
                    color: "white",
                    display: "inline",
                    marginLeft: "10px",
                    fontSize: "12px",
                    marginTop: "-6px",
                  }}
                >
                  academics
                </span>
              </h4>
            </div>
            <div className="Contents">
              <ul className="d-none d-sm-block list-unstyled">
                <li>Copyright &copy; GeekNote</li>
                <li>All rights reserved</li>
              </ul>
            </div>
            <div className="Links">
              <Link to="/">
                <img src={instagram} alt="Instagram" />
              </Link>
              <Link to="/">
                <img src={dribble} alt="Dribbble" />
              </Link>
              <Link to="/">
                <img src={youtube} alt="Youtube" />
              </Link>
              <Link to="/">
                <img src={twitter} alt="Twitter" />
              </Link>
            </div>
          </div>
          <span className=" d-block d-sm-none divider" />
          {/*Column2*/}
          <div className="col-12 col-sm-3">
            <div className="Option">
              <h5>Links</h5>
            </div>
            <div className="Contents">
              <ul className="list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/#about">About Us</Link>
                </li>
                <li>
                  <Link to="/#resources">Resources</Link>
                </li>
                <li>
                  <Link to="/#team">Our Team</Link>
                </li>
              </ul>
            </div>
          </div>
          <span className=" d-block d-sm-none divider" />
          {/*Column3*/}
          <div className="col-12 col-sm-3">
            <div className="Option">
              <h5>Other Links</h5>
            </div>
            <div className="Contents">
              <ul className="list-unstyled">
                <li>
                  <a href="https://geeknote.netlify.app/">GeekNote dev</a>
                </li>
                <li>
                  <a href="https://geeknote-algorithm.netlify.app/">
                    GeekNote algo
                  </a>
                </li>

                <li>
                  <Link to="/">Terms and Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <span className=" d-block d-sm-none divider" />
          {/*Column4*/}
          <div className="col-12 col-sm-3">
            <div className="sp">
              <h5>Stay Up to Date</h5>
            </div>
            <div className="d-none d-sm-block">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    className="forbg"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="d-block d-sm-none form">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    className="forbg"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="sp">
              <h5>Want to Contribute?</h5>
            </div>
            <div className="d-none d-sm-block sp-contents">
              <div
                className="text"
                style={{
                  fontSize: "14px",
                  height: "28px",
                  borderRadius: "20px",
                }}
              >
                <a href="https://github.com/tusharjain0022/GeekNote-academics">
                  github.com/GeekNote-academics
                </a>
              </div>
            </div>
            <div className="d-block d-sm-none spcontents">
              <div className="text" style={{ fontSize: "13px" }}>
                <a href="https://github.com/tusharjain0022/GeekNote-academics">
                  github.com/tusharjain0022/GeekNote
                </a>
              </div>
            </div>
          </div>
          <span className=" d-block d-sm-none spdivider" />
          {/*Column5*/}
          <div className="col-12 d-block d-sm-none baseLine">
            <p>All Rights Reserved Copyright &copy; GeekNote</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
