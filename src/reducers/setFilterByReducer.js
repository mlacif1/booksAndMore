import { SET_FILTER_BY } from "../actions/types";

const initialFilterby = [];

const initialState = {
  filterBy: localStorage.getItem("filterBy")
    ? JSON.parse(localStorage.getItem("filterBy"))
    : initialFilterby
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_BY:
      localStorage.setItem("filterBy", JSON.stringify(action.payload));
      return {
        ...state,
        filterBy: action.payload
      };
    default:
      return state;
  }
}
