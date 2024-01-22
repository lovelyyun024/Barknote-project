const SET_NOTES = "notes/setNotes";
const VIEW_NOTES = "notes/viewNotes";
const ADD_NOTE = "notes/addNote";
const UPDATE_NOTE = "notes/updateNote";
const DELETE_NOTE = "notes/deleteNote";
const FETCH_ONE_NOTE = "notes/fetchOneNote"; // New action type

const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes,
});

const viewNotes = (notes) => ({
  type: VIEW_NOTES,
  payload: notes,
});

const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

const updateNote = (note) => ({
  type: UPDATE_NOTE,
  payload: note,
});

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

const fetchOneNote = (note) => ({
  type: FETCH_ONE_NOTE,
  payload: note,
});

export const thunkFetchNotes = () => async (dispatch) => {
  const response = await fetch("/api/notes");
  if (response.ok) {
    const data = await response.json();
    dispatch(setNotes(data.notes));
  }
};

export const thunkFetchNBNotes = (notebookId) => async (dispatch) => {
  const response = await fetch(`/api/notebooks/${notebookId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(viewNotes(data.note));
  }
};

export const thunkFetchOneNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(fetchOneNote(data.note)); 
    return data;
  }
};

export const thunkCreateNote = (noteData) => async (dispatch) => {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNote(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateNote = (noteId, noteData) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateNote(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkDeleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteNote(noteId));
  }
};

const initialState = { notes: [] };

export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTES:
      return { ...state, notes: action.payload };
    case VIEW_NOTES:
      return { ...state, notes: action.payload };
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case FETCH_ONE_NOTE:
      return { ...state, notes: [action.payload] }; 
    default:
      return state;
  }
}
