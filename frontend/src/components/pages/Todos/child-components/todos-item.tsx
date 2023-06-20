import { ListGroupItem, Form, Button } from "react-bootstrap";
import Todo from "../../../../lib/data/dataObjects/Todo";
import React, { useState } from "react";
import EdibaleLabel from "../../../edibaleLabel/edibale-label";

type TodosItemProps = {
  todo: Todo;
  setTodo: (todo: Todo) => void;
  onDeleted: (todo: Todo) => void;
};

export default function TodosItem({
  todo,
  setTodo,
  onDeleted,
}: TodosItemProps) {
  if (!todo || todo.completed == null) return <></>;

  const [isEditable, setIsEditable] = useState<Boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title || "");

  const handleEdit = () => {
    setIsEditable(false);
    const newTodo = new Todo({
      ...(todo.toUnknowObject() as any),
      title: todoTitle,
    });
    newTodo.save();
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = new Todo({
      ...(todo.toUnknowObject() as any),
      completed: event.target.checked,
    });
    setTodo(newTodo);
    newTodo.save();
  };

  return (
    <div>
      {!isEditable && (
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <Form.Check
              onChange={handleCheckChange}
              type="checkbox"
              checked={todo.completed}
              label={
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todoTitle}
                </span>
              }
            />
            <div className="d-flex gap-2">
              <Button onClick={() => setIsEditable(!isEditable)}>Edit</Button>
              <Button onClick={() => onDeleted(todo)}>Delete</Button>
            </div>
          </div>
        </ListGroupItem>
      )}
      {isEditable && (
        <div className="d-flex justify-content-between">
          <EdibaleLabel
            isEditable={true}
            label="Title"
            setter={setTodoTitle}
            value={todoTitle}
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
