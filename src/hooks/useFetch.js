import { useState, useEffect } from "react";
import Axios from "axios";
const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options,setOptions]=useState({})
  const baseUrl = "https://conduit.productionready.io/api";
  const doFetch = (options={}) => {
    setOptions(options)
    setIsLoading(true)
  };
  useEffect(() => {
    console.log("useEffectTrigger");

    if (!isLoading) {
      return;
    }
    Axios(baseUrl + url,options)
      .then(res => {
        console.log(response);
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.response.data);
        setIsLoading(false);
        console.log(error);
      });
  }, [isLoading,url,options,response]);

  return [{ isLoading, response, error }, doFetch];
};
export default useFetch;
