// sort callback functions

export const drugNameSort = (a, b) => a.brandName.localeCompare(b.brandName);

export const drugSupplySort = (a, b) =>
  parseInt(a.currentSupply / a.dailyDoses) -
  parseInt(b.currentSupply / b.dailyDoses);

// filter callback functions

export const drugNameFilter = (drug, filterCriteria) =>
  drug.brandName.toLowerCase().includes(filterCriteria.toLowerCase()) ||
  drug.genericName.toLowerCase().includes(filterCriteria.toLowerCase());
