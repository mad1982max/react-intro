import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./TODO/todoList";
import AddTodo from "./TODO/AddTodo";
import context from "./context";

function App() {
  const [todos, setTodos] = useState([
    { id: 2561, compleate: false, title: "text1" },
    { id: 892, compleate: true, title: "text2" },
    { id: 783, compleate: false, title: "text3" },
  ]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/?_limit=10")
      .then((response) => response.json())
      .then((json) => setTodos([...todos, ...json]));
  }, []);

  function onChange(data) {
    setTodos(
      todos.map((item) => {
        if (item.id === data) {
          item.compleate = !item.compleate;
        }
        return item;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((item) => item.id !== id));
  }

  function addTodo(value) {
    let maxId = Math.max(...todos.map((item) => item.id));

    let newTodo = {
      id: ++maxId,
      compleate: false,
      title: value,
    };
    setTodos([...todos, newTodo]);
  }

  return (
    <context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 className="center">TUTORIAL</h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? (
          <TodoList todos={todos} onToggle={onChange} />
        ) : (
          <p className="center">EMPTY LIST</p>
        )}
      </div>
    </context.Provider>
  );
}

export default App;
