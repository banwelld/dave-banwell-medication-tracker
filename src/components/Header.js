import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <>
      <div className='container text-center mb-4'>
        <img
          src='../../public/MedTrackerIcon.png'
          alt='Medication Tracker Icon'
        />
        <h1 className='mt-2'>My Medication Tracker</h1>
      </div>
      <NavBar />
    </>
  );
}

export default Header;
