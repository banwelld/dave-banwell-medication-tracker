import React, { useState } from 'react';

function SearchFilter() {
  const [nameSearch, setNameSearch] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div className='row g-3'>
      <div className='col-12'>
        <div className='row justify-contents-center g-3 mb-2'>
          <div className='col-8'>
            <input
              id='nameSearch'
              type='text'
              className='form-control'
              value={nameSearch}
              placeholder='Search by brand or generic name...'
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <select
              id='sortSelect'
              className='form-select'
              value={filter}
              defaultValue='1'
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value='1'>Sort by brand name</option>
              <option value='2'>Sort by days supply</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
