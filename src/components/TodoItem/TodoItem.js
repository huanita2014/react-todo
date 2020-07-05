import React, { useState } from 'react';
import './TodoItem.css';

export default function TodoItem({
  id,
  title,
  done,
  toggleTodoDone,
  deleteTodo,
  editTodo,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isHover, setHover] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTodo(id);
  };

  const handleDoubleClick = (e) => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(id, newTitle);
    setEditing(false);
  };

  const handleBlur = (e) => {
    setEditing(false);
    editTodo(id, newTitle);
    setEditing(false);
  };

  const layoutForEditing = (
    <form className="todoItemEdit" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus={true}
      />
    </form>
  );

  const layoutForView = (
    <div
      className="todoItem"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={handleDoubleClick}
    >
      <form>
        <label className="checkboxContainer">
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleTodoDone(id)}
          />
          <span className="checkmark"></span>
        </label>
        <label className="todoLabel" id={done ? 'done' : 'notDone'}>
          {title}
        </label>
        <div className="deleteTodo">
          <button onClick={handleDelete} id={isHover ? 'visible' : 'invisible'}>
            &#10005;
          </button>
        </div>
      </form>
    </div>
  );

  return <li>{isEditing ? layoutForEditing : layoutForView}</li>;
}
