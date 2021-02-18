import "./Modal.css";
import { Button, Form } from "react-bootstrap";
import google_logo from "../../../images/google_logo.svg";

function SignupBox(props) {
  function handleChange() {
    props.onChange(0);
  }
  return (
    <Form>
      <Button className="  googleButton" type="submit">
        <img className="mr-3" src={google_logo} alt="Google" /> SignUp with
        Google
      </Button>

      <Form.Group controlId="formBasicEmail">
        <Form.Label className="inputLabel">Email address</Form.Label>
        <Form.Control
          type="email"
          className="formInput"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label className="inputLabel">Username</Form.Label>
        <Form.Control
          type="text"
          className="formInput"
          placeholder="Enter Username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword ">
        <Form.Label className="inputLabel ">Password</Form.Label>
        <Form.Control
          type="password"
          className="formInput"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          className="small-text"
          label="I Agree to all the Terms and condition and Privacy Policy"
        />
      </Form.Group>

      <Button className="loginSignupButton" type="submit">
        Continue
      </Button>
      <p className="text-center ">
        Already have an account ?{" "}
        <button
          type="button"
          onClick={handleChange}
          className="change-state-button"
        >
          Login here
        </button>
      </p>
    </Form>
  );
}

export default SignupBox;
