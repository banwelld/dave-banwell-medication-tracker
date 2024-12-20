import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MessageModal from '../../Modals/MessageModal';
import doFetch from '../../../utils/fetchFunction';
import { modalContent } from '../../../utils/lists';

function DrugCardActions({ drugId, currentSupply, setAllDrugData }) {
  // set state for the no supply modal

  const [noSupplyModalOpen, setNoSupplyModalOpen] = useState(false);

  // assign the messages for the modal to a variable

  const noSupplyModalContent = modalContent.DrugCardActions.noSupply;

  // state update to be triggered by fetch request

  const updateArrayItemInState = (updatedItem) => {
    setAllDrugData((prevData) =>
      prevData.map((item) => (item.id === drugId ? updatedItem : item))
    );
  };

  // deduct 1 from the drug's current supply if current supply is available

  const takeNowClick = () => {
    if (!(currentSupply > 0)) {
      setNoSupplyModalOpen(true);
    } else {
      doFetch('PATCH', { currentSupply: currentSupply - 1 }, drugId).then(
        updateArrayItemInState
      );
    }
  };

  return (
    <div className='px-3 pb-3'>
      <button className='btn btn-blue shadow container' onClick={takeNowClick}>
        Take Now
      </button>
      <Link
        to={`/DrugInfo/${drugId}`}
        className='btn btn-secondary mt-3 shadow container'
      >
        View All Drug Info
      </Link>
      <MessageModal
        isOpen={noSupplyModalOpen}
        close={() => setNoSupplyModalOpen(false)}
        content={noSupplyModalContent}
      />
    </div>
  );
}

export default DrugCardActions;
