import React from "react";
import "./App.css";
import TodoList from "./TODO/todoList";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, compleate: false, title: "text1" },
    { id: 2, compleate: false, title: "text2" },
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

  return (
    <div className="wrapper">
      <h1>TUTORIAL</h1>
      <TodoList todos={todos} onToggle={onChange}></TodoList>
    </div>
  );
}

export default App;
