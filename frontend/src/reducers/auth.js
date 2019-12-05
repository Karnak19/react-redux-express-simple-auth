const initialState = {
  token: ""
};

export const LOGIN = "LOGIN";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
        isAuth: true
      };

    default:
      return state;
  }
}
