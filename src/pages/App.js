import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // set state variables for drug warnings

  const [warnings, setWarnings] = useState([]);

  // get drug warnings from server

  const getDrugWarnings = () => {
    fetch('http://localhost:6001/warnings')
      .then((response) => response.json())
      .then((data) => setWarnings(data))
      .catch((error) => console.log(error));
  };

  // trigger fetch of drug warnings on component mount

  useEffect(() => {
    getDrugWarnings();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className='container'>
        <Outlet context={warnings} />
      </main>
    </>
  );
}

export default App;
