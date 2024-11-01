import React from 'react';

function SortFilter({
  drugSortCriteria,
  setDrugSortCriteria,
  drugFilterCriteria,
  setDrugFilterCriteria,
}) {
  // render the sort filter component

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='row justify-contents-center mb-2'>
          <div className='col-8'>
            <input
              id='nameFilter'
              type='text'
              className='form-control'
              value={drugFilterCriteria}
              placeholder='Filter by name (brand or generic)...'
              onChange={(e) => setDrugFilterCriteria(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <select
              id='sortSelect'
              className='form-select'
              value={drugSortCriteria}
              onChange={(e) => setDrugSortCriteria(e.target.value)}
            >
              <option value='name'>Sort by brand name</option>
              <option value='supply'>Sort by days supply</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortFilter;
