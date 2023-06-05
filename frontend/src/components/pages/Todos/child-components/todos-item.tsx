import { ListGroupItem, Form } from "react-bootstrap";
import Todo from "../../../../lib/data/dataObjects/Todo";
import React from "react";

type TodosItemProps = {
  todo: Todo;
  setTodo: (todo: Todo) => void;
};

export default function TodosItem({ todo, setTodo }: TodosItemProps) {
  if (!todo || todo.completed == null) return <></>;

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = new Todo({
      ...(todo.toUnknowObject() as any),
      completed: event.target.checked,
    })
    setTodo(newTodo);
    newTodo.save();
  };

  return (
    <ListGroupItem>
      <Form.Check
        onChange={handleCheckChange}
        type="checkbox"
        checked={todo.completed}
        label={
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
        }
      />
    </ListGroupItem>
  );
}
