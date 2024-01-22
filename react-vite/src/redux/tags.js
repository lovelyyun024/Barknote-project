const SET_TAGS = "tags/setTags"
const FETCH_ONE_TAG = "notes/fetchOneTag";
const ADD_TAG = "tags/addTag";
const UPDATE_TAG = "tags/updateTag";
const DELETE_TAG = "tags/deleteTag"

const setTags = (tags) => ({
  type: SET_TAGS,
  payload: tags,
});

const addTag = (tag) => ({
  type: ADD_TAG,
  payload: tag,
});

const updateTag = (tag) => ({
  type: UPDATE_TAG,
  payload: tag,
});

const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  payload: tagId,
});

const fetchOneTag = (tag) => ({
  type: FETCH_ONE_TAG,
  payload: tag,
});

export const thunkFetchTags = () => async (dispatch) => {
  const response = await fetch("/api/tags");
  if (response.ok) {
    const data = await response.json();
    dispatch(setTags(data.tags));
  }
};

export const thunkFetchOneTag = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchOneTag(data));
    return data;
  }
};

export const thunkCreateTag = (tagData) => async (dispatch) => {
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tagData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTag(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
}

export const thunkUpdateTag =
  (tagId, tagData) => async (dispatch) => {
    const response = await fetch(`/api/tags/${tagId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tagData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateTag(data));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkDeleteTag = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteTag(tagId));
  }
};

const initialState = { tags: [] };

function tagReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TAGS:
      return { ...state, tags: action.payload };
    case FETCH_ONE_TAG:
      return { ...state, tags: action.payload };
    case ADD_TAG:
      return { ...state, tags: [...state.tags, action.payload] };
    case UPDATE_TAG:
      return {
        ...state,
        tags: state.tags.map((tag) =>
          tag.id === action.payload.id ? action.payload : tag
        ),
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      };
    default:
      return state;
  }
}

export default tagReducer;
