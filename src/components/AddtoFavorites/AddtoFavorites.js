import React from "react";
import useFetch from "../../hooks/useFetch";
import classNames from 'classnames'
const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  console.log("AddtoFavoritesfavoritesCount", favoritesCount);
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const buttonClasses = classNames({
    btn: true,
    "btm-sm": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-prinary": !isFavoritedWithResponse
  });

  const handleLike = event => {
    event.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? "delete" : "post"
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
