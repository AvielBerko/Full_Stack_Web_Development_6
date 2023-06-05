import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useReducer, useState } from "react";
import Todo from "../../../../lib/data/dataObjects/Todo";
import TodosItem from "./todos-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";
import { FilterBy, SortBy } from "../types";

type TodosListProps = {
  sortBy: string;
  filterBy: string;
};

type TodosSortAction = {
  filterBy: string;
  sortBy: string;
  allTodos:Todo[];
};

function todosSortReducer(state: Todo[], action: TodosSortAction) {
  let ret = [...action.allTodos];
  //filter the todos
  switch (action.filterBy) {
    case FilterBy.DONE:
      ret = ret.filter((a) => a.completed);
      break;
    case FilterBy.NOT_DONE:
      ret = ret.filter((a) => !a.completed);
      break;
    case FilterBy.NONE:
    default:
      break;
  }
  //sort the todos
  switch (action.sortBy) {
    case SortBy.NAME:
      ret = ret.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      break;
    case SortBy.ID:
      ret = ret.sort((a, b) => {
        if (a.id && b.id) {
          const idA = String(a.id);
          const idB = String(b.id);
          return idA.localeCompare(idB);
        }
        // Handle the case where either a.id or b.id is undefined
        return 0;
      });
      break;
    case SortBy.CHECKED:
      ret = ret.sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1; // a comes before b
        }
        if (!a.completed && b.completed) {
          return -1; // b comes before a
        }
        return 0; // the order remains unchanged
      });
      break;
    default:
      break;
  }
  return ret;
}

export default function TodosList({ sortBy, filterBy }: TodosListProps) {
  const [user, _] = useSession<Nullable<User>>("user", null, UserSerializer);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [shownTodos, dispatch] = useReducer(todosSortReducer, todos);

  if (!user?.id) return <></>;

  //   let sortedPosts: Todo[];

  //   switch (sortBy) {
  //     case SortBy.NAME:
  //       sortedPosts = [...shownTodos].sort((a, b) => {
  //         if (a.title && b.title) {
  //           return a.title.localeCompare(b.title);
  //         }
  //         return 0;
  //       });
  //       break;
  //     case SortBy.ID:
  //       sortedPosts = [...shownTodos].sort((a, b) => {
  //         if (a.id && b.id) {
  //           const idA = String(a.id);
  //           const idB = String(b.id);
  //           return idA.localeCompare(idB);
  //         }
  //         // Handle the case where either a.id or b.id is undefined
  //         return 0;
  //       });
  //       break;
  //     case SortBy.CHECKED:
  //       sortedPosts = [...shownTodos].sort((a, b) => {
  //         if (a.completed && !b.completed) {
  //           return 1; // a comes before b
  //         }
  //         if (!a.completed && b.completed) {
  //           return -1; // b comes before a
  //         }
  //         return 0; // the order remains unchanged
  //       });
  //       break;
  //     default:
  //       sortedPosts = shownTodos;
  //       break;
  //   }
  //   setShownTodos(sortedPosts);
  // };

  // const handleFilter = () => {
  //   let filteredTodos: Todo[];

  //   switch (filterBy) {
  //     case FilterBy.DONE:
  //       filteredTodos = [...todos].filter((a) => a.completed);
  //       break;
  //     case FilterBy.NOT_DONE:
  //       filteredTodos = [...todos].filter((a) => !a.completed);
  //       break;
  //     case FilterBy.NONE:
  //     default:
  //       filteredTodos = todos;
  //       break;
  //   }
  //   setShownTodos(filteredTodos);
  // };

  useEffect(() => {
    user.todos.then((todos) => {
      setTodos(todos);
      dispatch({
        filterBy,
        sortBy,
        allTodos: todos,
      })
    });
  }, [user]);

  useEffect(() => {
    dispatch({
      filterBy,
      sortBy,
      allTodos: todos,
    });
  }, [sortBy,filterBy,todos]);

  

  const setTodo = (newTodo: Todo) => {
    const todoToChange = todos.findIndex((t: Todo) => newTodo.id === t.id);
    if (todoToChange >= 0) {
      setTodos((prev) => {
        prev[todoToChange] = newTodo;
        return [...prev];
      });
    }
  };

  const addTodo = () => {
    const newTodo = new Todo({
      userId: user.id,
      title: newTodoTitle,
      completed: false,
    });
    setTodos((prev) => [newTodo, ...prev]);
    newTodo.push();
    setNewTodoTitle("");
  };

  const todosDOM = shownTodos.map((todo: Todo) => {
    return <TodosItem todo={todo} setTodo={setTodo} key={todo.id} />;
  });

  return (
    <ListGroup>
      <ListGroupItem key="-23434989">
        <InputGroup>
          <Button onClick={addTodo}>Add Todo</Button>
          <Form.Control
            value={newTodoTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTodoTitle(e.target.value)
            }
          />
        </InputGroup>
      </ListGroupItem>
      {todosDOM}
    </ListGroup>
  );
}
