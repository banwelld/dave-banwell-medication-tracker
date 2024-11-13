import React from 'react';
import ReactDOM from 'react-dom';

function MessageModal({ isOpen, content, close }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='msg-modal-overlay' />
      <div className='msg-modal-container shadow'>
        <div className='msg-modal-header'>
          <h3>{content.title}</h3>
        </div>
        <div className='msg-modal-content'>
          <p>{content.message}</p>
          <button
            type='button'
            className='btn mx-auto my-1 text-light btn-blue shadow-sm'
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
