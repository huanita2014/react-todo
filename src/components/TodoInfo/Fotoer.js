import React from 'react';
import FilterButton from './FilterButton';
import './Footer.css';

export default function TodoInfo({
  itemsLeft,
  filterNames,
  setFilter,
  filter,
  clearCompleted,
}) {
  const itemsLeftText =
    itemsLeft > 1 || itemsLeft === 0
      ? `${itemsLeft} items left`
      : `${itemsLeft} item left`;

  const filterList = filterNames.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <React.Fragment>
      <div className="footer">
        {itemsLeftText}
        <ul>{filterList}</ul>
        <span>
          <button
            className="filterButton clearButton"
            onClick={() => clearCompleted()}
          >
            Clear completed
          </button>
        </span>
      </div>
      <div className="bottomBox"></div>
      <div className="bottomBox second"></div>
    </React.Fragment>
  );
}
