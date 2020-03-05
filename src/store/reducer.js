import { LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED } from "./types";



export const reducer = (state , action) => {
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
    default:
      return state;
  }
};
