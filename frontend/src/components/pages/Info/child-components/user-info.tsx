import { Card, Row, Col, Alert } from 'react-bootstrap';
import User from '../../../../lib/data/dataObjects/User';
import { useState } from 'react';
import EdibaleLabel from '../../../edibaleLabel/edibale-label';
import BlockButton from '../../../common/BlockButton/block-button';
import { Nullable } from '../../../../types/react.types';

type UserItemProps = {
  user: User;
  setUser: (value:Nullable<User>) => void;
};

const UserInfo = ({ user, setUser }: UserItemProps) => {
  const { id, username, email, city, companyName } = user;

  const [isEditable, setIsEditable] = useState(false);
  const [usernameValue, setUsernameValue] = useState<string>(username ?? "");
  const [emailValue, setEmailValue] = useState<string>(email ?? "");
  const [cityValue, setCityValue] = useState<string>(city ?? "");
  const [companyNameValue, setCompanyNameValue] = useState<string>(companyName ?? "");

  const [alert, setAlert] = useState("");

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



  const onSubmit = () => {
    const newUser = new User({
      id,
      username: usernameValue,
      email: emailValue,
      city: cityValue,
      companyName: companyNameValue,
    });
    if (username != usernameValue) {
      const checkUser = new User({});
      checkUser.first({ username:usernameValue }).then(() => {
      if (checkUser.id) {
        setAlert("User Name already exists.");
        return;
      }
      newUser.save();
      setUser(newUser);
      setIsEditable(!isEditable);
      });
    }
    else {
      setIsEditable(!isEditable);
      newUser.save();
      setUser(newUser);
    }
    closeAlert();
  };

  return (<>
    {alert != "" && alertDOM}
    <Card className="user-card">
      <Card.Body>
      <EdibaleLabel isEditable={isEditable} label='Username' setter={setUsernameValue} value={usernameValue} WrapperComponent={Card.Title} />
        <EdibaleLabel isEditable={isEditable} label='Email' setter={setEmailValue} value={emailValue} WrapperComponent={Card.Text} />
        {isEditable && 
          <div className="d-flex flex-row gap-2">
            <EdibaleLabel isEditable={isEditable} label='City' setter={setCityValue} value={cityValue} WrapperComponent={Card.Text} />
          </div>
        }
        {!isEditable && <Card.Text>City: {`${city}`}</Card.Text> }
        <EdibaleLabel isEditable={isEditable} label='Company' setter={setCompanyNameValue} value={companyNameValue} WrapperComponent={Card.Text} />
      </Card.Body>
    </Card>
    <BlockButton onClick={onSubmit}>{isEditable ? "Save" : "Edit"}</BlockButton>
  </>
  );
};

export default UserInfo;