import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark fs-4'
      style={{ backgroundColor: '#54B4D3' }}
    >
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          <img
            src='/images/MedTrackerIcon.png'
            alt='MedTracker icon'
            style={{ width: '1rem' }}
          />
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/DrugDiary'>
                Drug Diary
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/DrugInfo'>
                Drug Info
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
