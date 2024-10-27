import React from 'react';

function SearchFilter({
  sortCriteria,
  setSortCriteria,
  nameFilter,
  setNameFilter,
}) {
  // search/filter jsx code

  return (
    <div className='row g-3'>
      <div className='col-12'>
        <div className='row justify-contents-center g-3 mb-2'>
          <div className='col-8'>
            <input
              id='nameFilter'
              type='text'
              className='form-control'
              value={nameFilter}
              placeholder='Filter by brand or generic name...'
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <select
              id='sortSelect'
              className='form-select'
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
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

export default SearchFilter;
