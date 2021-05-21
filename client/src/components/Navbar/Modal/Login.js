import { Button, Form } from "react-bootstrap";
import google_logo from "../../../images/google_logo.svg";

function LoginBox(props) {
  function handleChange(value) {
    props.onChange(value);
  }
  return (
    <Form>
      <Button className=" googleButton mt-4" type="submit">
        <img className="mr-3" src={google_logo} alt="google" />
        Login with Google
      </Button>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="inputLabel">Username</Form.Label>
        <Form.Control
          type="text"
          className="formInput"
          placeholder="Enter Username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className="inputLabel">Password</Form.Label>
        <Form.Control
          type="password"
          className="formInput"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Remember me"
          style={{ display: "inline" }}
        />
        <Form.Label className=" float-right" style={{ display: "inline" }}>
          <p type="button" onClick={() => handleChange(2)} className="mb-5">
            Forgot Password ?
          </p>
        </Form.Label>
      </Form.Group>

      <Button className="loginSignupButton" type="submit">
        Login
      </Button>
      <p className="text-center smal-text">
        Don't have an account ? {"   "}
        <button
          type="button"
          onClick={() => handleChange(1)}
          className="change-state-button mb-3"
        >
          Signup here
        </button>
      </p>
    </Form>
  );
}

export default LoginBox;
