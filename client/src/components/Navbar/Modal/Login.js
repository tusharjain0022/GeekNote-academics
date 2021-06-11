import { Button, Form } from "react-bootstrap";
import google_logo from "../../../images/google_logo.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Notify from "../../Notify";

function LoginBox(props) {
    let history = useHistory();
    const apiBaseURL =
        process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

    // ********* STATE VARIABLES ************
    // admin (Object) = To store details added by admin in login form
    const [admin, setAdmin] = useState({
        email: "",
        password: "",
    });
    // errors (Object) = To store validation errors in input fields
    const [errors, setErrors] = useState({
        email: " ",
        password: "",
    });
    // loginDisabled (Boolean) = toggles the disable status of Login Button
    const [loginDisabled, setLoginDisabled] = useState(true);

    // Checks for any error to disable/enable Login Button
    useEffect(() => {
        if (errors.email || errors.password) setLoginDisabled(true);
        else setLoginDisabled(false);
    }, [errors]);

    //Validate Function to validate input field values
    const validate = (prop) => {
        const err = {};
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (prop.email.trim() === "") err.email = "Email is Required !";
        else if (!reg.test(prop.email.toLowerCase()))
            err.email = "Invalid Email !";
        else err.email = null;
        if (prop.password === "") err.password = "Password is Required !";
        else err.password = null;

        setErrors({ ...errors, ...err });
    };

    //Handles changes in the login form and calls the validate function
    const handleChange = (event) => {
        const input = event.currentTarget;
        const tempAdmin = { ...admin };
        tempAdmin[input.name] = input.value;
        setAdmin(tempAdmin);
        validate(tempAdmin);
    };
    // Handles form submit event , calling the login API and
    // validating the email and password provided by the admin with the backend.
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${apiBaseURL}/login`, { ...admin })
            .then((res) => {
                //Login is succesfull : Email and password matched
                window.localStorage.setItem("token", res.data.token); // storing jwt-token in local storage for authorized API calls
                history.push("/admin");
                Notify("Login Successful 🚀", "success");
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
        // Notify("Logging you in ! ⚡", "info");
    };
    return (
        <Form>
            <Button
                className=' googleButton mt-4'
                onClick={() =>
                    Notify(
                        "Google Authorization not available, Try Normal Login! ⚡",
                        "info"
                    )
                }
            >
                <img className='mr-3' src={google_logo} alt='google' />
                Login with Google
            </Button>
            <Form.Group controlId='email'>
                <Form.Label className='inputLabel'>Email</Form.Label>
                <Form.Control
                    type='text'
                    className='formInput'
                    name='email'
                    onChange={handleChange}
                    value={admin.email}
                    placeholder='Enter Email'
                />
                {errors.email && (
                    <div className='text-danger error-message'>
                        <b>{errors.email}</b>
                    </div>
                )}
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label className='inputLabel'>Password</Form.Label>
                <Form.Control
                    type='password'
                    className='formInput'
                    name='password'
                    onChange={handleChange}
                    value={admin.password}
                    placeholder='Password'
                />
                {errors.password && (
                    <div className='text-danger error-message'>
                        <b>{errors.password}</b>
                    </div>
                )}
            </Form.Group>

            <Form.Group controlId='formBasicCheckbox'>
                <Form.Check
                    type='checkbox'
                    label='Remember me'
                    style={{ display: "inline" }}
                />
                <Form.Label
                    className=' float-right'
                    style={{ display: "inline" }}
                >
                    <p
                        type='button'
                        // onClick={() => handleChange(2)}
                        onClick={() =>
                            Notify("Feature not available 😥", "info")
                        }
                        className='mb-5'
                    >
                        Forgot Password ?
                    </p>
                </Form.Label>
            </Form.Group>

            <Button
                className='loginSignupButton'
                type='submit'
                data-dismiss='modal'
                onClick={handleSubmit}
                disabled={loginDisabled}
            >
                Login
            </Button>
            <p className='text-center smal-text'>
                Don't have an account ? {"   "}
                <button
                    type='button'
                    onClick={() => props.onChange(1)}
                    className='change-state-button mb-3'
                >
                    Signup here
                </button>
            </p>
        </Form>
    );
}

export default LoginBox;
