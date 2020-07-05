import React from 'react';

export default function filterButton({ name, isPressed, setFilter }) {
  return (
    <li>
      <button
        className="filterButton"
        id={isPressed ? 'pressed' : 'notPressed'}
        onClick={() => setFilter(name)}
      >
        <span>{name}</span>
      </button>
    </li>
  );
}
