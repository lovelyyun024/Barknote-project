const SET_LOADER = "loader/setLoader";

export const setLoader = (loading) => ({
  type: SET_LOADER,
  payload: loading,
});

const initialState = {
  isLoading: false,
};

const loadingActionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loadingActionReducer;
