import "./Modal.css";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import google_logo from "../../../images/google_logo.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Notify from "../../Notify";

function SignupBox(props) {
    let history = useHistory();
    const apiBaseURL =
        process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

    // ********* STATE VARIABLES ************
    // admin (Object) = To store details added by admin in signup form
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        password: "",
    });
    // errors (Object) = To store validation errors in input fields
    const [errors, setErrors] = useState({
        name: "",
        email: " ",
        password: "",
    });
    // signupDisabled (Boolean) = toggles the disable status of Signup Button
    const [signupDisabled, setSignupDisabled] = useState(true);

    // Checks for any error to disable/enable Signup Button
    useEffect(() => {
        if (errors.email || errors.password || errors.name)
            setSignupDisabled(true);
        else setSignupDisabled(false);
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
        if (prop.name.trim() === "") err.name = "Name is Required !";
        else err.name = null;

        setErrors({ ...errors, ...err });
    };

    //Handles changes in the Signup form and calls the validate function
    const handleChange = (event) => {
        const input = event.currentTarget;
        const tempAdmin = { ...admin };
        tempAdmin[input.name] = input.value;
        setAdmin(tempAdmin);
        validate(tempAdmin);
    };
    // Handles form submit event , calling the register API with input data and
    // validating the invite link provided in the URL with the backend.
    const handleSubmit = (event) => {
        event.preventDefault();

        // getting inviteCode from the invite link for validation
        const queryParams = new URLSearchParams(window.location.search);
        const inviteCode = queryParams.get("id");

        axios
            .post(`${apiBaseURL}/register`, { admin, inviteCode })
            .then((res) => {
                Notify("Signup Successful 🚀", "success");
                window.localStorage.setItem("token", res.data.token); // storing jwt-token in local storage for authorized API calls
                history.push("/admin");
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
        // Notify("Please wait ! ⚡", "info");
    };
    return (
        <Form>
            <Button
                className='  googleButton'
                onClick={() =>
                    Notify(
                        "Google Authorization not available, Try Normal Login! ⚡",
                        "info"
                    )
                }
            >
                <img className='mr-3' src={google_logo} alt='Google' /> SignUp
                with Google
            </Button>

            <Form.Group controlId='name'>
                <Form.Label className='inputLabel'>Full Name</Form.Label>
                <Form.Control
                    type='text'
                    className='formInput'
                    name='name'
                    onChange={handleChange}
                    value={admin.name}
                    placeholder='Enter your Full Name'
                />
                {errors.name && (
                    <div className='text-danger error-message'>
                        <b>{errors.name}</b>
                    </div>
                )}
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label className='inputLabel'>Email address</Form.Label>
                <Form.Control
                    type='email'
                    className='formInput'
                    name='email'
                    onChange={handleChange}
                    value={admin.email}
                    placeholder='Enter email'
                />
                {errors.email && (
                    <div className='text-danger error-message'>
                        <b>{errors.email}</b>
                    </div>
                )}
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label className='inputLabel '>Password</Form.Label>
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
                    className='small-text'
                    label='I Agree to all the Terms and condition and Privacy Policy'
                />
            </Form.Group>

            <Button
                className='loginSignupButton'
                data-dismiss='modal'
                onClick={handleSubmit}
                disabled={signupDisabled}
                type='submit'
            >
                Signup
            </Button>
            <p className='text-center '>
                Already have an account ?{" "}
                <button
                    type='button'
                    onClick={() => props.onChange(0)}
                    className='change-state-button'
                >
                    Login here
                </button>
            </p>
        </Form>
    );
}

export default SignupBox;
