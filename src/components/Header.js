import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <>
      <div className='container text-center mb-4'>
        <div class='d-flex align-items-center justify-content-center gap-3 mt-3 mb-3'>
          <img
            src='/images/MedTrackerIcon.png'
            alt='Medication Tracker Icon'
            style={{ width: '4rem' }}
            className=''
          />
          <h1 className='text-secondary'>MedTracker</h1>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default Header;
