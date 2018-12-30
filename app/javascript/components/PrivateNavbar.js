import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveSearch from './LiveSearch'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/private/1/dashboard",
    exact: true,
    main: () => <h2>Home</h2>
  },
  {
    path: "/private/1/dashboard",
    main: () => <h2>couocu</h2>
  },
  {
    path: "/bouyaka",
    main: () => <h2>Shoelaces</h2>
  }
];

function Sidebar() {
  return (
    <Router>
      <div className= 'row'>
        <div className= 'col s2'>
          <div className='private-nav'>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="/private/1/dashboard">Recherche</Link>
              </li>
              <li>
                <Link to="/private/1/dashboard">Recherche</Link>
              </li>
              <li>
                <Link to="/bouyaka">Recherche</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col s10'>
          <div className='loulou'>
            <Route
              path='/private/1/dashboard'
              component={LiveSearch}
            />
          </div>
        </div>
        <Route
          path='/bouyaka'
          component={Child}
        />
      </div>
    </Router>
  );
}

function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}

export default Sidebar;
