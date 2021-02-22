import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import branches from "../../data/branches.json";
import ModalBox from "./Modal/Modal";

function Navbar_Top() {
  const [form, setForm] = useState(0);
  function handleChange(newValue) {
    setForm(newValue);
  }

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg fixed-top">
        <Link className="navbar-brand" to="/">
          GeekNote
          <span
            style={{
              color: "white",

              fontSize: "12px",
              marginTop: "-6px",
            }}
          >
            academics
          </span>
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/#about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled
              >
                Resources
              </Link>
              <div
                className="dropdown-menu text-center"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {branches.map((obj) => {
                  return (
                    <Link className="dropdown-item" to={obj.link}>
                      {obj.name}
                    </Link>
                  );
                })}
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://geeknote.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                GeekNote dev
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://geeknote-algorithm.netlify.app"
                target="_blank"
                rel="noreferrer"
              >
                GeekNote algo
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#team">
                Our Team
              </Link>
            </li>
          </ul>
          <div className=" button-group">
            <button
              type="button"
              className="btn login-signup"
              data-toggle="modal"
              data-target="#staticBackdrop"
              onClick={() => handleChange(0)}
            >
              Login
            </button>
            <button
              type="button"
              className="btn login-signup"
              data-toggle="modal"
              data-target="#staticBackdrop"
              onClick={() => handleChange(1)}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>
      <ModalBox form={form} onChange={handleChange} />
    </div>
  );
}
export default Navbar_Top;
