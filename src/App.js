import React, { lazy, useEffect, useState } from "react";
import "./App.css";
import TodoList from "./TODO/todoList";
import Loader from "./Loader";
// import AddTodo from "./TODO/AddTodo";
import context from "./context";

const AddTodo = lazy(() => import("./TODO/AddTodo"));

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoad, setLoadingState] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/?_limit=10")
      .then((response) => response.json())
      .then((todos) =>
        setTimeout(() => {
          setLoadingState(true);
          setTodos(todos);
        }, 3000)
      );
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
        <React.Suspense fallback={<p>...LOADING</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {!isLoad && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={onChange} />
        ) : !isLoad ? null : (
          <p className="center">EMPTY LIST</p>
        )}
      </div>
    </context.Provider>
  );
}

export default App;
