# MedTracker

MedTracker is a medication compliance and supply tracking application built with React, designed to simplify medication management by providing a user-friendly interface to add, view, and manage medications and track doses taken.

## Table of Contents

[Project Overview](#project-overview)  
[Features](#features)  
[Installation](#installation)  
[Usage](#usage)  
[API Endpoints](#api-endpoints)  
[Components](#components)  
[Custom Hooks](#custom-hooks)  
[Technologies Used](#technologies-used)  
[Contributing](#contributing)  
[License](#license)

## Project Overview

MedTracker is a web-based tool for tracking and managing medications. It allows users to add, edit, and remove medications from their list, providing a streamlined way to manage their medication schedule.

## Features

**View Medications**: Displays a list of all current medications, with relevant details.

**Colour-coded Drug Cards**: A drug's card turns amber when user has only 5 days' supply remaining and red when supply is depleted.

**Filter and Sort Medications**: Filter by name substring or sort by days supply remaining.

**Add New Medications**: Users can add new medications by providing details like name, dosage, and schedule.

**Take Now**: Users can click a simple button to track their compliance and deduct doses from their current supply of each medication.

## Installation

To set up MedTracker locally, ensure you have Node.js and npm installed.

Clone the repository:

```bash
git clone https://github.com/banwelld/dave-banwell-medication-tracker.git
cd medtracker
```

```bash
npm install
```

## Usage

To use MedTracker:

- Start the server by running npm run server.
- Launch the application by running npm start.

You’ll be presented with a dashboard where you can add new medications, view the list of medications, and update or delete entries as needed.

## API Endpoints

MedTracker interacts with a backend API (db.json) running on port 6001 for CRUD operations on medication data. Here’s an outline of the main endpoints:

GET /medications: Retrieve a list of all medications  
POST /medications: Add a new medication  
PUT /medications/#id: Update an existing medication  
DELETE /medications/#id: Delete a medication

### Example Fetch Function

The app uses a reusable doFetch function to interact with these endpoints:

```javascript
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
```

doFetch keeps code within the component light and eminently readable, especialy for GET operations:

```javascript
doFetch().then((data) => setAllDrugData(data));
```

```javascript
doFetch('POST', newDrugObject).then(addNewItemToState);
```

## Components

### Key components in MedTracker:

**DrugCard**: Displays basic inforation about a medication and presents user with a Take Now button to track compliance and supply

**AddDrug form**: Form on the homepage to input and add new medications

**AdjustSupplyForm**: Calculator-like form to update existing medication suplies and even remove medications from user's personal list

**MessageModal**: A modal component to show messages using React portals

## Custom Hooks

MedTracker leverages one custom React hook:

**useDocumentTitle**: A custom hook to display dynamic page titles on the browser tabs.

Example:

```javascript
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `MedTracker | ${title}`;
  }, []);
}
```

## Technologies Used

**Frontend**: React, JavaScript, HTML, CSS

**Database**: db.json

**Additional Libraries**: React Router, Bootstrap

## Contributing

If you'd like to contribute to MedTracker:

- Fork the repository
- Create a new branch (git checkout -b feature/YourFeature)
- Make your changes and commit (git commit -m 'Add new feature')
- Push to the branch (git push origin feature/YourFeature)
- Open a Pull Request

## License

See the license tab.
