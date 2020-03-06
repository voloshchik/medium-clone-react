import React, { useEffect, useState, useContext } from "react";
import ArticleForm from "../ArticleForm/ArticleForm";
import useFetch from "../../hooks/useFetch";

import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = "/articles";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: []
  };
  console.log("isSuccessfullSubmit", isSuccessfullSubmit);

  const handleSubmit = article => {
    doFetch({
      method: "post",
      data: {
        article
      }
    });
  };
  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);
  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (currentUserState.isLoggedIn === null) {
    return null;
  }

  if (isSuccessfullSubmit || currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  
  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
