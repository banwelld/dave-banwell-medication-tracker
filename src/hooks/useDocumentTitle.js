import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `MedTracker | ${title}`;
  }, [title]);
}

export default useDocumentTitle;
