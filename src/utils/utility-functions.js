export const fetchOperation = (
  onSuccess,
  method = 'GET',
  pushData = null,
  id = null,
  endpoint = 'medications'
) => {
  // customize fetch options based on function arguments

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: pushData ? JSON.stringify(pushData) : null,
  };

  // perform fetch operation and handle response

  fetch(`http://localhost:6001/${endpoint}${id ? '/' + id : ''}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
