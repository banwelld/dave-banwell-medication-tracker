import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <>
      <div className='container text-center mb-4 mt-2'>
        <img
          src='/images/MedTrackerIcon.png'
          alt='Medication Tracker Icon'
          style={{ width: '75px' }}
        />
        <h1 className='mt-2'>Med Tracker</h1>
      </div>
      <NavBar />
    </>
  );
}

export default Header;
