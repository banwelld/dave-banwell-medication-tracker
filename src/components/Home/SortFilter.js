import React from 'react';

function SortFilter({
  drugSortCriteria,
  setDrugSortCriteria,
  drugFilterCriteria,
  setDrugFilterCriteria,
}) {
  // render the sort filter component

  return (
    <div className='row justify-contents-center'>
      <div className='col'>
        <select
          id='sortSelect'
          className='form-select home-input'
          value={drugSortCriteria}
          onChange={(e) => setDrugSortCriteria(e.target.value)}
        >
          <option value='name'>Sort by brand name</option>
          <option value='supply'>Sort by days supply</option>
        </select>
      </div>
      <div className='col input-group'>
        <input
          id='nameFilter'
          type='text'
          className='form-control home-input'
          value={drugFilterCriteria}
          placeholder='Filter by name (brand or generic)...'
          onChange={(e) => setDrugFilterCriteria(e.target.value)}
        />
        <button
          className='btn btn-blue text-light'
          type='button'
          id='button-addon'
          onClick={() => setDrugFilterCriteria('')}
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}

export default SortFilter;
