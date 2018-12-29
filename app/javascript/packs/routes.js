import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import LiveSearch from './components/liveSearch';

const App = (props) => (
  <Router>
    <div>
      <Route exact path='/private/:id/dashboard' component={LiveSearch} />
    </div>
  </Router>
)
export default App;