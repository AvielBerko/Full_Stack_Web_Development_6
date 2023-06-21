import { ListGroupItem, Button } from "react-bootstrap";
import { useState } from "react";
import EdibaleLabel from "../../../edibaleLabel/edibale-label";
import UserPassword from "../../../../lib/data/dataObjects/UserPassword";

type UserDataItemProps = {
  up: UserPassword;
  onDeleted: (up: UserPassword) => void;
};

export default function UserDataItem({ up, onDeleted }: UserDataItemProps) {
  if (!up) return <></>;

  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [userId, setUserId] = useState<string>(up.id || "");
  const [password, setPassword] = useState<string>(up.password || "");

  const handleEdit = () => {
    // setIsEditable(false);
    // const newTodo = new Todo({
    //   ...(todo.toUnknowObject() as any),
    //   title: todoTitle,
    // });
    // newTodo.save();
  };

  return (
    <div>
      {!isEditable && (
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <p>{userId}</p>
              <p>{password}</p>
            </div>
            <div className="d-flex gap-2">
              <Button onClick={() => setIsEditable(!isEditable)}>Edit</Button>
              <Button onClick={() => onDeleted(up)}>Delete</Button>
            </div>
          </div>
        </ListGroupItem>
      )}
      {isEditable && (
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
      )}
    </div>
  );
}
