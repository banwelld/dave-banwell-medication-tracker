import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { fetchOperation } from '../utils/utility-functions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // set State variables for drug data

  const [allDrugData, setAllDrugData] = useState([]);

  // fetch drug data from server

  useEffect(() => {
    fetchOperation((data) => setAllDrugData(data));
  }, []);

  // return the App component

  return (
    <>
      <header>
        <Header />
      </header>
      <main className='container'>
        <Outlet context={[allDrugData, setAllDrugData]} />
      </main>
    </>
  );
}

export default App;
