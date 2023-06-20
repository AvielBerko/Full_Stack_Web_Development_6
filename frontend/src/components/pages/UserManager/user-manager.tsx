import { useSession } from "../../../hooks/use-session";
import { Container, Row, Col } from "react-bootstrap";
import User from "../../../lib/data/dataObjects/User";
import { Nullable } from "../../../types/react.types";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";
import UserDataList from "./child-com/user-data-list";

export default function UserManager() {
  const [user, _] = useSession<Nullable<User>>("user", null, UserSerializer);

  if (!user?.id) return <></>;

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Usersss</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserDataList user={user}></UserDataList>
        </Col>
      </Row>
    </Container>
  );
}
