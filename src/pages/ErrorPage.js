import React from 'react';

function ErrorPage() {
  return (
    <div className='row err-pg-container justify-content-center align-items-center align-text-center m-3'>
      <div className='col-2'>
        <img
          src='/images/MedTrackerIcon.png'
          className='mt-icon-lg'
          alt='MedTracker Icon'
        />
      </div>
      <div className='col-6 justify-content-center align-items-center align-text-center'>
        <h1 className='text-blue'>Oops, something went wrong...</h1>
        <h4 className='text-muted'>
          The page you're looking for doesn't exist.
        </h4>
        <p>(ERROR 404)</p>
      </div>
    </div>
  );
}

export default ErrorPage;
