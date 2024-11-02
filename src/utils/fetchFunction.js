// abstracted fetch function that takes in parameters and conducts any fetch operation based on the included parameters

const doFetch = (method = 'GET', data = null, id = '') => {
  const SERVER_URL = `http://localhost:6001/medications/${id}`;
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: data && JSON.stringify(data),
  };

  const handleFetchResponse = (response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  };

  const handleError = (err) => {
    alert('Error in fetching data. See the console for details.');
    console.log(err.message);
  };

  return fetch(SERVER_URL, options)
    .then(handleFetchResponse)
    .catch(handleError);
};

export default doFetch;
