import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalBox from "./Modal/Modal";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Notify from "../Notify";

function Navbar_Top() {
    let history = useHistory();
    const apiBaseURL =
        process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

    // ********* STATE VARIABLES ************
    const [form, setForm] = useState(0);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    // Handle Logout from single device
    function handleLogOut() {
        axios
            .post(
                `${apiBaseURL}/logout`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                Notify("Logout Successful 🚀", "success");
                // removing web token from local storage
                window.localStorage.removeItem("token");
                setToken(window.localStorage.getItem("token"));
                history.push("/");
            })
            .catch((error) => {
                //Server responded but with a error response
                if (error.response)
                    Notify(`${error.response.data.message} 😥`, "error");
                //Server didn't responded but a request was made
                else if (error.request)
                    Notify(
                        `Server didn't responded!😥 Please check your network or try after sometime `,
                        "error"
                    );
                //All other types of error if arises
                else Notify(`Something went wrong ! ⚠`, "error");
            });
    }

    //Handle logout from all the devices
    function handleLogOutAll() {
        axios
            .post(
                `${apiBaseURL}/logoutAll`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                Notify("Logout Successful 🚀", "success");
                //removing web token from local storage
                window.localStorage.removeItem("token");
                setToken(window.localStorage.getItem("token"));
                history.push("/");
            })
            .catch((error) => {
                //Server responded but with a error response
                if (error.response)
                    Notify(`${error.response.data.message} 😥`, "error");
                //Server didn't responded but a request was made
                else if (error.request)
                    Notify(
                        `Server didn't responded!😥 Please check your network or try after sometime `,
                        "error"
                    );
                //All other types of error if arises
                else Notify(`Something went wrong ! ⚠`, "error");
            });
    }
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
        setToken(window.localStorage.getItem("token"));
    }, [location, token]);

    return (
        <div className='Navbar'>
            <nav className='navbar navbar-expand-lg fixed-top'>
                <Link className='navbar-brand' to='/'>
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
                    className='navbar-toggler '
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarNavDropdown'
                >
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                        <li className='nav-item dropdown'>
                            <Link className='nav-link' to='/#about'>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/#resources'>
                                Resources
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/#team'>
                                Our Team
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <a
                                className='nav-link'
                                href='/admin'
                                rel='noreferrer'
                            >
                                Admin Section
                            </a>
                        </li>
                    </ul>
                    {token && (
                        <>
                            <div className=' button-group'>
                                <button
                                    type='button'
                                    className='btn login-signup'
                                    data-toggle='tooltip'
                                    data-placement='bottom'
                                    title='Logout from this device'
                                    onClick={() => handleLogOut()}
                                >
                                    Logout
                                </button>
                                <button
                                    type='button'
                                    className='btn login-signup'
                                    data-toggle='tooltip'
                                    data-placement='bottom'
                                    title='Logout from all the device'
                                    style={{ width: "160px" }}
                                    onClick={() => handleLogOutAll()}
                                >
                                    Logout from all devices
                                </button>
                            </div>
                        </>
                    )}
                    {!token && (
                        <>
                            <div className=' button-group'>
                                <button
                                    type='button'
                                    className='btn login-signup'
                                    data-toggle='modal'
                                    data-target='#staticBackdrop'
                                    onClick={() => handleChange(0)}
                                >
                                    Login
                                </button>
                                <button
                                    type='button'
                                    className='btn login-signup'
                                    data-toggle='modal'
                                    data-target='#staticBackdrop'
                                    onClick={() => handleChange(1)}
                                >
                                    Sign up
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>
            <ModalBox form={form} onChange={handleChange} />
        </div>
    );
}
export default Navbar_Top;
