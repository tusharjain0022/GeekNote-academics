import "./Modal.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

function OtpBox(props) {
  function handleChange() {
    props.onChange(0);
  }

  const [verified, setVerified] = useState(0);
  function handleVerified(newValue) {
    setVerified(newValue);
  }
  const [otpStatus, setOtpStatus] = useState(0);
  function handleOtpStatus(newValue) {
    setOtpStatus(newValue);
  }

  return (
    <Form>
      {" "}
      {verified === 0 && (
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="inputLabel">Username</Form.Label>
          <Form.Control
            type="text"
            className="formInput"
            placeholder="Enter Username"
          />
          <Button
            className="loginSignupButton mt-3"
            onClick={() => handleOtpStatus(1)}
          >
            Send OTP
          </Button>
          {otpStatus === 1 && (
            <p className="small-text font-weight-bolder text-center">
              An OTP has been sent to your registered email id .
            </p>
          )}
          {otpStatus === 0 && (
            <p className="small-text" style={{ visibility: "hidden" }}>
              An OTP has been sent to your registered email id .
            </p>
          )}
        </Form.Group>
      )}
      <Form.Group controlId="otp" className="inputLabel">
        <Form.Label>Enter OTP</Form.Label>
        <Form.Control
          type="number"
          placeholder=" - - - -"
          className="formInput"
        />
      </Form.Group>
      {verified === 1 && (
        <>
          <p className="text-center">OTP Verified Succesfully</p>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="inputLabel">Enter New Password</Form.Label>
            <Form.Control
              type="password"
              className="formInput"
              placeholder="New Password "
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="inputLabel">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              className="formInput"
              placeholder="Retype Password "
            />
          </Form.Group>
        </>
      )}
      {/* <p>
        Didn't get any OTP ? {"   "}
        <span style={{ textDecoration: "underline" }}>Resend OTP</span>
      </p> */}
      {verified === 0 && (
        <Button
          className="loginSignupButton mt-2"
          onClick={() => handleVerified(1)}
        >
          Verify OTP
        </Button>
      )}
      {verified === 1 && (
        <Button
          className="loginSignupButton mt-2"
          onClick={() => handleVerified(1)}
        >
          Change Your Password
        </Button>
      )}
      <p className="text-center smal-text">
        Already have an account ?{"   "}
        <button
          type="button"
          onClick={handleChange}
          className="change-state-button mb-3"
        >
          Login here
        </button>
      </p>
    </Form>
  );
}

export default OtpBox;
