import  { useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { CurrentUserContext } from "../contexts/currentUser";
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChekcer = ({ children }) => {
  const [, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const [token] = useLocalStorage("token");
  const [{ response }, doFetch] = useFetch("/user");
  console.log("response", response);
  useEffect(() => {
    if (token) {
      setCurrentUserState(state => {
        return { ...state, isLoggedIn: false };
      });
    }
    doFetch();
    setCurrentUserState(state => {
      return { ...state, isLoading: true };
    });
  }, [setCurrentUserState,token,doFetch]);
  useEffect(() => {
    if (!response) {
      return;
    }
    setCurrentUserState(state => {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: response.user
      };
    });
  }, [response,setCurrentUserState]);

  return children;
};
export default CurrentUserChekcer;
