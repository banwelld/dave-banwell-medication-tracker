import React, { useState, useEffect } from 'react';
import Header from '../components/App/Header';
import { Outlet } from 'react-router-dom';
import doFetch from '../utils/fetchFunction';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // set State variables for drug data

  const [allDrugData, setAllDrugData] = useState([]);

  // fetch drug data from server

  useEffect(() => {
    doFetch().then((data) => setAllDrugData(data));
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
