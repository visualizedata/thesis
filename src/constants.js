export const HEIGHT_TO_WIDTH = 0.5625;
export const BODY_WIDTH = 0.8;

export const FILTERS = {
  TAG: {
    type: "MULTI_SELECT",
    options: [],
    selected: [],
  },
  YEAR: {
    type: "RANGE",
    options: [],
    selected: [],
  },
  SEARCH: {
    type: "TEXT",
    selected: "",
  },
};

export const PARAMS = {
  SORT: {
    id: "SORT",
    type: "SINGLE_SELECT",
    options: [
      {
        label: "Student name",
        value: "name",
      },
      {
        label: "Year",
        value: "year",
      },
    ],
    selected: "name",
    asc: true,
  },
};
