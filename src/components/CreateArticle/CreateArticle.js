import React from "react";
import ArticleForm from "../ArticleForm/ArticleForm";

const CreateArticle = () => {
  const error = {};
  const initialValues = {};
  const handleSubmit = data => {
    console.log("handleSubmit", data);
  };
  return (
    <div>
      <ArticleForm
        error={error}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
