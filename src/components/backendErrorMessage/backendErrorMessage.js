import React from "react";

const BackendErrorMessages = ({ backendErrors }) => {
  console.log("backendErrors", backendErrors);
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name].join(" ");
    return `${name} ${messages}`;
  });
  console.log("errorMessages", errorMessages);
  return (
    <ul className="error-messages">
      {errorMessages.map(errorMessage => {
        return <li key={errorMessage}>{errorMessage}</li>;
      })}
    </ul>
  );
};

export default BackendErrorMessages;
