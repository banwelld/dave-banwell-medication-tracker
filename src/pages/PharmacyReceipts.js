function DrugDiary() {
  return (
    <div className='row m-3 align-items-center justify-content-center'>
      <div className='col-6'>
        <h2>Your pharmacy receipt</h2>
        <p className='text-secondary lead'>
          Pharmacy receipts can be confusing...
        </p>
        <p>
          This infographic will help you in gleaning the information needed to
          add your medications to your MedTracker list.
        </p>
        <img src='/images/pharmacy-receipt.jpg' alt='A prescription receipt' />
      </div>
    </div>
  );
}

export default DrugDiary;
