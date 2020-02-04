import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);
  //   const [{response,isLoading,error,doFetch}]=useFetch('someUrl')
  const hundleSubmit = e => {
    e.preventDefault();
    setSubmiting(true);
  };
  useEffect(() => {
    console.log("useEffectTrigger");
    document.title = email;
    if (!isSubmiting) {
      return;
    }
    Axios("https://conduit.productionready.io/api/users/login", {
      method: "post",
      data: { user: { email: "sds@ssxs.ww", password: "123" } }
    })
      .then(response => {
        console.log(response);
        setSubmiting(false);
      })
      .catch(error => {
        setSubmiting(false);
        console.log(error);
      });
  }, [isSubmiting]);
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="register">Need an account?</Link>
            </p>
            <form onSubmit={hundleSubmit}>
              <fieldset>
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
                  disabled={isSubmiting}
                >
                  Sign in
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
