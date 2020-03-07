import { LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED, LOGOUT } from "./types";

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case SET_AUTHORIZED:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload
      };
    case SET_UNAUTHORIZED:
      return {
        ...state,
        isLoggedIn: false
      };
    case LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
