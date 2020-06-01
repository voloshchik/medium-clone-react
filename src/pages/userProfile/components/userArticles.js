import React, {useEffect} from 'react'
import {stringify} from 'query-string'
import {getPagination, limit} from '../../../utils'
import useFetch from '../../../hooks/useFetch'
import Pagination from '../../../components/pagination/pagination'
import Feed from '../../../components/feed/feed'
import Loading from '../../../components/loading/loading'
import ErrorMessage from '../../../components/errorMessage/errorMessage'

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit, offset, favorited: username}
    : {
        limit,
        offset,
        author: username,
      }
  return `/articles?${stringify(params)}`
}
// const getApiUrl = ({username, offset, isFavorites}) => {
//     const params = isFavorites
//       ? {
//           limit,
//           offset,
//           favorited: username
//         }
//       : {
//           limit,
//           offset,
//           author: username
//         }
//     return `/articles?${stringify(params)}`
//   }

const UserArticles = ({username, location, isFavorites, url}) => {
  const [currentPage, offset] = getPagination(location.search)
  console.log('currentPage,offset', offset, currentPage)
  const apiUrl = getApiUrl({username, offset, isFavorites})
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch])
  return (
    <div>
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
  )
}

export default UserArticles
