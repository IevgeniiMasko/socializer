import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import currentUserReducer from "./currentUser/reducer";
import postReducer from "./post/reducer";

const reducers = combineReducers({
  auth: authReducer,
  currentUser: currentUserReducer,
  post: postReducer,
  // settings: settingsReducer,
  // forms: formsReducer,
  // notifications: notificationReducer,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
