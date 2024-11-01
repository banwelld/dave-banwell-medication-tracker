import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-center gap-3 my-3'>
          <img
            src='/images/MedTrackerIcon.png'
            alt='MedTracker Icon'
            className='mt-icon-md'
          />
          <h1 className='text-secondary'>MedTracker</h1>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default Header;
