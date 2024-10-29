import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // return the App component

  return (
    <>
      <header>
        <Header />
      </header>
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
