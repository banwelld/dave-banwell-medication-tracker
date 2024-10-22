import React from 'react';

function DrugDiary(state) {
  return (
    <div className='row m-3'>
      <div className='col-6'>
        <h2>How to read your pharmacy receipt</h2>
        <p>
          Pharmacy receits can be confusing to read. This infographic will help
          you in gleaning the information needed to add your medications to your
          MedTracker list.
        </p>
        <img
          src='https://pans.ns.ca/sites/default/files/labels-now_0.jpg'
          alt='A prescription receipt'
        />
      </div>
    </div>
  );
}

export default DrugDiary;
