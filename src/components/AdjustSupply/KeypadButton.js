import React from 'react';

function KeypadButton({ btnShape, colour, text, step, onClick, type }) {
  return (
    <button
      className={`btn ${btnShape} btn-${colour} my-2 container shadow`}
      type={type || 'button'}
      onClick={onClick}
    >
      {text} {step && Math.abs(step)}
    </button>
  );
}

export default KeypadButton;
