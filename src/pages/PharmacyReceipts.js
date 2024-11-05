import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

function PharmacyReceipts() {
  useDocumentTitle('Reading Pharmacy Receipts');
  return (
    <>
      <h3 className='my-3'>Reading pharmacy receipts</h3>
      <div className='row g-3 mt-3 align-items-center justify-contents-center'>
        <div className='col'>
          <p className='text-secondary lead'>
            Pharmacy receipts can be confusing...
          </p>
          <p>
            This infographic will help you in gleaning the information needed to
            add your medications to your MedTracker list.
          </p>
          <p>
            If your receipt has only one drug name (brand or generic), you can
            find the corresponsing name easily though a google search.
          </p>
          <p>
            Often times, warnings are not listed on your pharmacy receipt. Be
            sure to check your medication's container (bottle, box, tube, etc.)
            for any warning labels applied by the pharmacy or included by the
            manufacturer.
          </p>
        </div>
        <div className='col'>
          <img
            src='/images/pharmacy-receipt.jpg'
            alt='A prescription receipt'
          />
        </div>
      </div>
    </>
  );
}

export default PharmacyReceipts;
