const initialState = {
  token: "",
  isAuth: false
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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
