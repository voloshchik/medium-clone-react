import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import BackendErrorMessages from "../../components/backendErrorMessage/backendErrorMessage";

const Settings = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = "/user";
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const handleSubmit = () => {};

  return (
    <div className="srttings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1>Your settings</h1>
            {error && <BackendErrorMessages />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group  ">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group ">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="User name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="10"
                    placeholder="Short bio"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group  ">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group  ">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
