import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  let [todo, setTodo] = useState([
    { task: "sample task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    setTodo([...todo, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  let MarkAllDone = () => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) => {
        return { ...todo, isDone: true };
      })
    );
  };

  let markAsDone = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: true };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        placeholder="Add a task"
        value={newTodo}
        onChange={updateTodoValue}
        className="todo-input"
      />
      <br />
      <button onClick={addNewTask} className="todo-button">
        Add Task
      </button>
      <br />
      <br />
      <hr />
      <h4>Tasks Todo</h4>
      <ul className="todo-list">
        {todo.map((todo) => {
          return (
            <li key={todo.id} className="todo-item">
              <span
                style={todo.isDone ? { textDecoration: "line-through" } : {}}
                className="todo-task"
              >
                {todo.task}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-button"
              >
                Delete
              </button>
              <button
                onClick={() => markAsDone(todo.id)}
                className="todo-button"
              >
                Done
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <button onClick={MarkAllDone} className="todo-mark-all-button">
        Mark All As Done
      </button>
    </div>
  );
}
