import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CurrentUserContext } from "../../contexts/currentUser";
import BackendErrorMessages from "../../components/backendErrorMessage/backendErrorMessage";

const Authentication = props => {
  const isLogin = props.match.path === "/login";
  const pageTitle = isLogin ? "Sign in" : "Sign up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = isLogin ? "/users/login" : "/users";
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const [isSuccessfulSubmit, setIsSuccessSubmit] = useState(false);
  const [, setToken] = useLocalStorage("token");
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );

  console.log("currentUserState", currentUserState);
  const hundleSubmit = e => {
    e.preventDefault();

    const user = isLogin ? { email, password } : { email, password, username };
   
    doFetch({
      method: "post",
      data: {
        user
      }
    });
  };
  useEffect(() => {
    if (!response) {
      return;
    }
    localStorage.setItem("token", response.user.token);
    setIsSuccessSubmit(true);
    setCurrentUserState(state => {
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        currentUser: response.user
      };
    });
  }, [response, setToken, setCurrentUserState]);
  if (isSuccessfulSubmit) {
    return <Redirect to="/" />;
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={hundleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-primary btn-lg pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
// id: 83335
// email: "lovkiy2012@gmail.com"
// createdAt: "2020-02-05T18:32:53.776Z"
// updatedAt: "2020-02-05T18:32:53.782Z"
// username: "test7806895"
// bio: null
// image: null
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODMzMzUsInVzZXJuYW1lIjoidGVzdDc4MDY4OTUiLCJleHAiOjE1ODYxMTE1NzN9.CMM9VXtrLEe42Uu8ClAMdzYARX9-4WLazI1bk7ajpOo"
