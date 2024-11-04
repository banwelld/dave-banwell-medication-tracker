import React from 'react';
import ReactDOM from 'react-dom';

function MessageModal({ isOpen, content, close }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='modal-overlay' />
      <div className='modal-container shadow'>
        <div className='modal-header'>
          <h3>{content.title}</h3>
        </div>
        <div className='modal-content'>
          {content.message}
          <button
            type='button'
            className='btn mx-auto my-3 text-light btn-blue shadow-sm'
            onClick={close}
          >
            OK
          </button>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
}

export default MessageModal;
