import React, { useEffect } from "react";
import Feed from "../components/feed/feed";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/pagination/pagination";

const GlobalFeed = () => {
  const apiUrl = "/articles?limit=10&offset=0";
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  console.log(response);
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination total={500} limit={10} url='/' currentPage={2} />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
