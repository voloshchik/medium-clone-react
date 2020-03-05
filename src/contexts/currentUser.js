import { createContext, useState,useReducer } from "react";
import React from "react";
import { reducer } from '../store/reducer';

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null
};

export const CurrentUserContext = createContext([{}, () => {}]);
export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState)
  // const [state, setState] = useState({
  //   isLoading: false,
  //   isLoggedIn: null,
  //   currentUser: null
  // });
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};
