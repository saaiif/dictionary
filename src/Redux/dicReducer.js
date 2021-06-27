import {
  SEARCH_WORDS_LOADING,
  SEARCH_WORDS_SUCCESS,
  SEARCH_WORDS_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  info: [],
  error: "",
};

export const dicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WORDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_WORDS_SUCCESS:
      return {
        loading: false,
        info: action.payload,
        error: "",
      };
    case SEARCH_WORDS_FAILURE:
      return {
        loading: false,
        info: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
