import {stringify} from 'query-string'
import React, {useEffect} from 'react'
import Feed from '../../components/feed/feed'
import useFetch from '../../hooks/useFetch'
import Pagination from '../../components/pagination/pagination'
import {getPagination, limit} from '../../utils'
import PopularTags from '../../components/pupularTags/popularTags'
import Loading from '../../components/loading/loading'
import ErrorMessage from '../../components/errorMessage/errorMessage'
import FeedToggler from '../../components/feedToggler/feedToggler'

const TagFeed = ({location, match}) => {
  // console.log('locationTagFeed', location)
  const [currentPage, offset] = getPagination(location.search)
  const tagName = match.params.slug
  // console.log('TagFeedcurrentPage', currentPage, offset)
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)

  const url = match.url
  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])
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
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
