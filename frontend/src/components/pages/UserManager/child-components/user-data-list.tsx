import { Button, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
import { useCookie } from "../../../../hooks/use-cookie";
import { COOKIE_NAME } from "../../../../lib/data/loders/mainLoader/getLoader";
import UserPassword from "../../../../lib/data/dataObjects/UserPassword";
import UserDataItem from "./user-data-item";

export default function UserDataList({ user }: { user: User }) {
  const [usersData, setUsersData] = useState<UserPassword[]>([]);
  const [cookie] = useCookie(COOKIE_NAME);

  if (!user?.id) return <></>;

  useEffect(() => {
    if (!cookie) return;
    const userPasswords = new UserPassword({});
    userPasswords.all({COOKIE_NAME: cookie}).then((users) => {
      setUsersData(users);
    });
  }, [cookie]);

  const handleUserDelete = (up: UserPassword) => {
    if (!up) return;
    const newUsersData = usersData.filter((p) => p.id !== up.id);
    setUsersData(newUsersData);
    up.remove();
  };

  const addUser = () => {
    // const userPasswords = new UserPassword({});
    // userPasswords.create(cookie).then((up) => {
    //     setUsersData([...usersData, up]);
    // });
  };

  const userDataDOM = usersData.map((up: UserPassword) => {
    return <UserDataItem up={up} onDeleted={handleUserDelete} key={up.id} />;
  });

  return (
    <ListGroup>
      <ListGroupItem key="-23434989">
        <InputGroup>
          {/*<Button onClick={addUser}>Add User</Button>
           <Form.Control
              value={new}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTodoTitle(e.target.value)
              }
            /> */}
        </InputGroup>
      </ListGroupItem>
      {userDataDOM}
    </ListGroup>
  );
}
