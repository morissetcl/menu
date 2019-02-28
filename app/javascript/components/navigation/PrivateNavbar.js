import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearch, faSignOutAlt, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import LiveSearch from '../LiveSearch'
import Restaurant from '../Restaurant'
import Favorite from '../actions/Favorite'
import Calendar from '../Calendar'
import NavigationLinks from './NavigationLinks'

class PrivateNavbar extends Component {

  constructor(props) {
    super(props);
  };

  render(){
    return(
      <Router>
        <div className= 'row'>
          <div className= 'col s1 revert-padding-col'>
            <div className='private-nav'>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <NavigationLinks
                  path={`/private/${this.props.userId}/dashboard`}
                  icon={faSearch}
                />
                <NavigationLinks
                  path={`/private/${this.props.userId}/favorite`}
                  icon={faStar}
                />
                <NavigationLinks
                  path={`/private/${this.props.userId}/calendar`}
                  icon={faCalendarWeek}
                />
                <a href='/users/sign_out' data-method="delete" rel="nofollow">
                  <li className='navbar-link'><FontAwesomeIcon icon={faSignOutAlt}/></li>
                </a>
              </ul>
            </div>
          </div>
          <div className='col s11 offset-s1'>
            <Route
              exact path='/private/:userId/dashboard'
              component={LiveSearch}
              userId={this.props.userId}
            />
          </div>
          <div className='col s11 offset-s1'>
            <Route
              exact path='/restaurant/:id'
              component={Restaurant}
            />
          </div>
          <div className='col s11 offset-s1'>
            <Route
              path='/private/:userId/favorite'
              component={Favorite}
              userId={this.props.userId}
            />
          </div>
          <div className='col s11 offset-s1'>
            <Route
              path='/private/:userId/calendar'
              component={Calendar}
              userId={this.props.userId}
            />
          </div>
        </div>
      </Router>
    )
  };
}
export default PrivateNavbar;
