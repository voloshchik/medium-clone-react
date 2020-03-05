import { useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CurrentUserContext } from "../contexts/currentUser";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED } from "../store/types";

const CurrentUserChekcer = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");
  const [{ response }, doFetch] = useFetch("/user");

  useEffect(() => {
    if (!token) {
      dispatch({ type: SET_UNAUTHORIZED });
      // setCurrentUserState(state => ({ ...state, isLoggedIn: false }));
      return;
    }

    doFetch();
    dispatch({ type: LOADING });
    // setCurrentUserState(state => {
    //   return { ...state, isLoading: true };
    // });
  }, [token, dispatch, doFetch]);
  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: SET_AUTHORIZED, payload: response.user });
    // setCurrentUserState(state => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isLoggedIn: true,
    //     currentUser: response.user
    //   };
    // });
  }, [response, dispatch]);

  return children;
};
export default CurrentUserChekcer;
