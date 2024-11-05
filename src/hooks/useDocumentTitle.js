import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `MedTracker | ${title}`;
  }, []);
}

export default useDocumentTitle;
