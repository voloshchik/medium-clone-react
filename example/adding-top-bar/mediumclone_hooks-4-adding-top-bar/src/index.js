import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from 'routes'
import Topbar from 'components/topbar'

const App = () => {
  return (
    <Router>
      <Topbar />
      <Routes />
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
