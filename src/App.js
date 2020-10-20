import React from "react";
import "./App.css";
import TodoList from "./TODO/todoList";
import context from "./context";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, compleate: false, title: "text1" },
    { id: 2, compleate: true, title: "text2" },
    { id: 3, compleate: false, title: "text3" },
  ]);

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

  return (
    <context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>TUTORIAL</h1>
        <TodoList todos={todos} onToggle={onChange}></TodoList>
      </div>
    </context.Provider>
  );
}

export default App;
