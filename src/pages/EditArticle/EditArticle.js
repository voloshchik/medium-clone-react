import React, { useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser";

const EditArticle = ({ match }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticlError },
    doUpdateArticle
  ] = useFetch(apiUrl);

  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const handeleSubmit = article => {
    console.log("handeleSubmit", article);
    doUpdateArticle({
      method: "put",
      data: {
        article
      }
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if(currentUserState.isLoggedIn===false){
    return <Redirect to='/' />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handeleSubmit}
      errors={(updateArticlError && updateArticlError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
