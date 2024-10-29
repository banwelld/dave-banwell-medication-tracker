// sort callback functions

export const drugNameSort = (a, b) => a.brandName.localeCompare(b.brandName);

export const drugSupplySort = (a, b) =>
  parseInt(a.inStock / a.dailyQty) - parseInt(b.inStock / b.dailyQty);

// filter callback functions

export const drugNameFilter = (drug, filterCriteria) =>
  drug.brandName.toLowerCase().includes(filterCriteria.toLowerCase()) ||
  drug.genericName.toLowerCase().includes(filterCriteria.toLowerCase());
