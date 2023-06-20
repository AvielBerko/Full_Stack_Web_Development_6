import Input from "../../common/Input/input";
import BlockButton from "../../common/BlockButton/block-button";
import { useState } from "react";
import User from "../../../lib/data/dataObjects/User";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { useSession } from "../../../hooks/use-session";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";
import { useNavigate } from "react-router-dom";
import UserPassword from "../../../lib/data/dataObjects/UserPassword";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const [_, setAuth] = useSession("user", null, UserSerializer);

  /**
   * Validates the form.
   * @returns {string} An error message if the form is invalid, or an empty string if the form is valid.
   */
  const validateForm = () => {
    // Add your validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const englishRegex = /^[A-Za-z0-9\s]+$/;
    const userNameMaxLength = 16;

    if (!email) {
      return "Email is required.";
    }

    if (!emailRegex.test(email)) {
      return "Email is not valid.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (!passwordRegex.test(password)) {
      return "Password must contain a letter, a number, a special character, and be between 6 and 16 characters long.";
    }

    if (!passwordConfirm) {
      return "Confirm Password is required.";
    }

    if (password !== passwordConfirm) {
      return "Password and Confirm Password must match.";
    }

    if (!username) {
      return "Username is required.";
    }

    if (username.length > userNameMaxLength) {
      return "Username cannot exceed 16 characters.";
    }

    if (!englishRegex.test(username)) {
      return "Username can only contain English letters and numbers.";
    }


    if (!city) {
      return "City is required.";
    }

    if (!companyName) {
      return "Company name is required.";
    }

    if (!englishRegex.test(companyName)) {
      return "Company name can only contain English letters and numbers.";
    }


    return ""; // Empty string indicates the form is valid
  };

  const onSubmit = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setAlert(errorMessage);
    } else {
      const checkUser = new User({});
      checkUser.first({ username }).then(() => {
        if (checkUser.id) {
          setAlert("Username already exists.");
          return;
        }
        const newUser = new User({
          username: username,
          city,
          companyName,
          email,
        });
        const newUserPassword = new UserPassword({
          username,
          password,
        });
        newUser.push().then(() => {
          newUserPassword.push().then(() => {
            setAuth(newUser);
            navigate("/home");
          });
        });
      });
    };
  }

  const closeAlert = () => {
    setAlert("");
  };

  const alertDOM = (
    <Row>
      <Col>
        <Alert variant="danger" onClose={closeAlert} dismissible>
          {alert}
        </Alert>
      </Col>
    </Row>
  );

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Sign Up</h1>
        </Col>
      </Row>
      {alert != "" && alertDOM}
      <Row>
        <Col>
          <Input
            placeholder="Username"
            value={username}
            setter={setUsername}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            placeholder="Password"
            inputType="password"
            value={password}
            setter={setPassword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            inputType="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            setter={setPasswordConfirm}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Email" value={email} setter={setEmail} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="City" value={city} setter={setCity} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input placeholder="Company Name" value={companyName} setter={setCompanyName} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlockButton variant="success" onClick={onSubmit}>
            Sign Up!
          </BlockButton>
        </Col>
      </Row>
    </Container>
  );
}