import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

export default function TodoList({
  todos,
  toggleTodoDone,
  deleteTodo,
  editTodo,
  filters,
  filter,
}) {
  const todoItems = todos
    .filter(filters[filter])
    .map((todo) => (
      <TodoItem
        id={todo._id}
        title={todo.title}
        done={todo.done}
        key={todo._id}
        toggleTodoDone={toggleTodoDone}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    ));

  return <ul>{todoItems}</ul>;
}
