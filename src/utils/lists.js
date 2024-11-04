// list of drug warnings and instructions

export const drugWarnings = [
  {
    id: 'isOptional',
    labelText: 'As needed',
  },
  {
    id: 'withFood',
    labelText: 'Take with food',
  },
  {
    id: 'withWater',
    labelText: 'Take with plenty of water',
  },
  {
    id: 'fullStomach',
    labelText: 'Take on full stomach',
  },
  {
    id: 'emptyStomach',
    labelText: 'Take on empty stomach',
  },
  {
    id: 'onSleep',
    labelText: 'Take near bedtime',
  },
  {
    id: 'onWake',
    labelText: 'Take just after waking up',
  },
  {
    id: 'avoidAlcohol',
    labelText: 'Do not drink alcohol while taking',
  },
  {
    id: 'causesSleep',
    labelText: 'May cause drosiness.',
  },
  {
    id: 'evenDosing',
    labelText: 'Spread doses through the day',
  },
  {
    id: 'takeAll',
    labelText: 'Take the entire course',
  },
  {
    id: 'dontStop',
    labelText: 'Seek medical advice before stopping',
  },
  {
    id: 'NoDriving',
    labelText: 'Do not drive after use',
  },
];

// blueprint with list of all possible drug attributes

export const drugBlueprint = {
  brandName: '',
  genericName: '',
  drugFormat: '',
  doseUnits: '',
  doseValue: '',
  currentSupply: '',
  dailyDoses: '',
  isOptional: false,
  withFood: false,
  withWater: false,
  fullStomach: false,
  emptyStomach: false,
  onSleep: false,
  onWake: false,
  avoidAlcohol: false,
  causesSleep: false,
  evenDosing: false,
  takeAll: false,
  dontStop: false,
  noDriving: false,
  imageLink: '',
};

// error titles and messages for modals in the project
export const modalContent = {
  DrugCardActions: {
    noSupply: {
      title: 'Medication not available!',
      message:
        'Your supply of this medication is set to 0. Be sure to visit your pharmacy and have it refilled soon. If you\'ve recently refilled this medication but haven\'t uupdated your supply, pease visit the "Adjust Supply" page before indicating a taken dose.',
    },
  },
  AddDrug: {
    emptyFields: {
      title: 'Form incomplete!',
      message:
        'You have left one or more of the fields in the form empty. In order to track your medication stock and compliance, you must include all of the requested information. Please ensure all fields contain the requested information and then click "Submit".',
    },
  },
  AdjustSupplyForm: {
    lessThanZero: {
      title: 'Deduction exceeds supply!',
      message:
        'You cannot adjust your supply to be less than zero. Please try again.',
    },
  },
};
