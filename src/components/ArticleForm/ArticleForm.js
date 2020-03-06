import React, { useState, useEffect } from "react";
import BackendErrorMessages from "../backendErrorMessage/backendErrorMessage";

const ArticleForm = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [taglist, setTagList] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const article = {
      title,
      body,
      description,
      taglist
    };
    onSubmit(article);
    console.log("fields", title, body, description, taglist);
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }
    console.log("initialValues", initialValues);
    setTitle(initialValues.title);
    setBody(initialValues.body);
    setDescription(initialValues.description);
    setTagList(initialValues.tagList.join(" "));
  }, [initialValues]);
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors} />}
            BackendErrorMessages
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-comtrol-lg"
                    placeholder="Article title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-comtrol-lg"
                    placeholder="What is this article about"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-comtrol-lg"
                    placeholder="Enter tags"
                    value={taglist}
                    onChange={e => setTagList(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
