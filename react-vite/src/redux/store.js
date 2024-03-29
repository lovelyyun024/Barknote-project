import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import notebookReducer from "./notebooks";
import noteReducer from "./notes";
import tagReducer from "./tags";
import onetagReducer from "./onetag";
import taskReducer from "./tasks";
import loadingActionReducer from "./loader"

const rootReducer = combineReducers({
  session: sessionReducer,
  notebook: notebookReducer,
  note: noteReducer,
  tag: tagReducer,
  onetag: onetagReducer,
  task: taskReducer,
  loader:loadingActionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
