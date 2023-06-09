import { ListGroupItem, Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import EdibaleLabel from "../../../edibaleLabel/edibale-label";
import UserPassword from "../../../../lib/data/dataObjects/UserPassword";
import { COOKIE_NAME } from "../../../../lib/data/loders/mainLoader/getLoader";

type UserDataItemProps = {
  up: UserPassword;
  cookie: string;
  onDeleted: (up: UserPassword) => void;
};

export default function UserDataItem({
  up,
  cookie,
  onDeleted,
}: UserDataItemProps) {
  if (!up) return <></>;

  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [userId, _] = useState<string>(up.id || "");
  const [password, setPassword] = useState<string>(up.password || "");

  const createObject = (key: string, value: string) => {
    return Object.assign({}, { [key]: value });
  };

  const handleEdit = () => {
    setIsEditable(false);
    const newUserPassword = new UserPassword({
      ...(up.toUnknowObject() as any),
      password,
    });
    newUserPassword.save(createObject(COOKIE_NAME, cookie));
  };

  return (
    <div>
      {!isEditable && (
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <Container>
              <Row>
                <Col>
                  <p>{userId}</p>
                  <p>{password}</p>
                </Col>
              </Row>
            </Container>
            <div className="d-flex gap-2">
              <Button onClick={() => setIsEditable(!isEditable)}>Edit</Button>
              <Button onClick={() => onDeleted(up)}>Delete</Button>
            </div>
          </div>
        </ListGroupItem>
      )}
      {isEditable && (
        <div>
          <p>{userId}</p>
          <div className="d-flex justify-content-between">
            <EdibaleLabel
              isEditable={true}
              label="Password"
              setter={setPassword}
              value={password}
              WrapperComponent={ListGroupItem}
            />
            <div className="d-flex gap-2">
              <Button onClick={() => handleEdit()}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
