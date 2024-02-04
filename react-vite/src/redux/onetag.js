const FETCH_ONE_TAG = "onetag/fetchOneTag";

const fetchOneTag = (tag) => ({
  type: FETCH_ONE_TAG,
  payload: tag,
});

export const thunkFetchOneTag = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchOneTag(data));
    return data;
  }
};

const initialState = { tags: [] };

function onetagReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ONE_TAG:
      return { ...state, onetags: action.payload };
    default:
      return state;
  }
}

export default onetagReducer;
