import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { LOGIN, LOGOUT } from "./actionTypes";

const initialState = {
  token: "",
  isAuth: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
        isAuth: true
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
