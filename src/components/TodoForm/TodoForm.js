import React, { useState } from 'react';
import './TodoForm.css';

export default function TodoForm({ addTodo, toggleTodos, errorNotify }) {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim());
      setTitle('');
    } else {
      errorNotify('Please provide some text for todo title');
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="todoFormWrapper">
      <button className="toggleTodo" onClick={() => toggleTodos()}>
        <i className="arrowDown"></i>
      </button>
      <form className="todoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
