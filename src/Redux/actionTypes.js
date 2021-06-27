import axios from "axios";

export const SEARCH_WORDS_LOADING = "SEARCH_WORDS_LOADING";
export const SEARCH_WORDS_SUCCESS = "SEARCH_WORDS_SUCCESS";
export const SEARCH_WORDS_FAILURE = "SEARCH_WORDS_FAILURE";

export const fetchWords = () => {
  return {
    type: SEARCH_WORDS_LOADING,
  };
};
export const fetchWordsSuccess = (info) => {
  return {
    type: SEARCH_WORDS_SUCCESS,
    payload: info,
  };
};
export const fetchWordsFailure = (error) => {
  return {
    type: SEARCH_WORDS_FAILURE,
    payload: error,
  };
};

export const fetchInfo = (word) => {
  const endPoint = process.env.REACT_APP_ENDPOINT;
  return (dispatch) => {
    dispatch(fetchWords);
    axios
      .get(`${endPoint}/${word}`)
      .then((response) => {
        const details = response.data;
        dispatch(fetchWordsSuccess(details));
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        dispatch(fetchWordsFailure(errorMessage));
      });
  };
};
