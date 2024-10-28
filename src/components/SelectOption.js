import React from 'react';

function SelectOption({ listItem }) {
  const displayText = listItem === 0 ? '' : listItem;
  return (
    <option key={listItem} value={listItem} selected={listItem === 0}>
      {displayText}
    </option>
  );
}

export default SelectOption;
