const SET_NOTEBOOKS = "notebooks/setNotebooks";
const ADD_NOTEBOOK = "notebooks/addNotebook";
const UPDATE_NOTEBOOK = "notebooks/updateNotebook";
const DELETE_NOTEBOOK = "notebooks/deleteNotebook";
const REMOVE_NOTE = "notebooks/removeNote"

const setNotebooks = (notebooks) => ({
  type: SET_NOTEBOOKS,
  payload: notebooks,
});

const addNotebook = (notebook) => ({
  type: ADD_NOTEBOOK,
  payload: notebook,
});

const updateNotebook = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  payload: notebook,
});

const deleteNotebook = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  payload: notebookId,
});

const removeNote = (noteId) => ({
  type: REMOVE_NOTE,
  payload: noteId,
});

export const thunkFetchNotebooks = () => async (dispatch) => {
  const response = await fetch("/api/notebooks");
  if (response.ok) {
    const data = await response.json();
    dispatch(setNotebooks(data.notebooks));
  }
};

export const thunkCreateNotebook = (notebookData) => async (dispatch) => {
  const response = await fetch("/api/notebooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebookData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNotebook(data));
  }
};

export const thunkUpdateNotebook =
  (notebookId, notebookData) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebookData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateNotebook(data));
    }
  };

export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteNotebook(notebookId));
  }
};

export const thunkDeleteNBNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeNote(noteId));
  }
};

const initialState = { notebooks: [] };

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTEBOOKS:
      return { ...state, notebooks: action.payload };
    case ADD_NOTEBOOK:
      return { ...state, notebooks: [...state.notebooks, action.payload] };
    case UPDATE_NOTEBOOK:
      return {
        ...state,
        notebooks: state.notebooks.map((notebook) =>
          notebook.id === action.payload.id ? action.payload : notebook
        ),
      };
    case DELETE_NOTEBOOK:
      return {
        ...state,
        notebooks: state.notebooks.filter(
          (notebook) => notebook.id !== action.payload
        ),
      };
    case REMOVE_NOTE:
       return {
         ...state,
         notebooks: state.notebooks.map((notebook) => {
           if (notebook.notes.some((note) => note.id === action.payload)) {
             const updatedNotes = notebook.notes.filter(
               (note) => note.id !== action.payload
             );

             return {
               ...notebook,
               notes: updatedNotes,
             };
           }

           return notebook;
         }),
       };
    default:
      return state;
      
  }
}

export default notebookReducer;
