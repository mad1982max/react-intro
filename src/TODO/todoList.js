import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
};

function TodoList(props) {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo, key) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={key}
          onChange={props.onToggle}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onToggle: PropTypes.func,
};

export default TodoList;
