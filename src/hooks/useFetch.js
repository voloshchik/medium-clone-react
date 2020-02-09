import { useState, useEffect,useCallback } from "react";
import Axios from "axios";
import useLocalStorage from "./useLocalStorage";
const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");
  const baseUrl = "https://conduit.productionready.io/api";

  const doFetch =useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  },[]) 
  useEffect(() => {
    const requestOption = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ""
        }
      }
    };
    if (!isLoading) {
      return;
    }
    Axios(baseUrl + url, requestOption)
      .then(res => {
        console.log(response);
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.response.data);
        setIsLoading(false);
      
      });
  }, [isLoading, url, options, response, token]);

  return [{ isLoading, response, error }, doFetch];
};
export default useFetch;
