import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearch, faSignOutAlt, faCalendarWeek, faConciergeBell } from '@fortawesome/free-solid-svg-icons'
import LiveSearch from '../LiveSearch'
import Restaurant from '../Restaurant'
import Favorite from '../Favorite'
import Calendar from '../Calendar'
import Dashboard from '../Dashboard'

class PrivateNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSearch: false,
      activeFavorite: false,
      activeCalendar: false,
      activeDashboard: true,
    }
  };

  addClassActiveLink(param) {
    switch(param) {
    case 'dashboard':
      return this.setState({ activeSearch: false, activeFavorite: false, activeCalendar: false, activeDashboard: true });
    case 'search':
      return this.setState({ activeSearch: true, activeFavorite: false, activeCalendar: false, activeDashboard: false });
    case 'favorite':
      return this.setState({ activeSearch: false, activeFavorite: true, activeCalendar: false, activeDashboard: false });
    case 'calendar':
      return this.setState({ activeSearch: false, activeFavorite: false, activeCalendar: true, activeDashboard: false });
    default:
      return 'foo';
    }
  }

  buildLink(link, state, icon) {
    return <Link to={`/private/${this.props.userId}/${link}`} onClick={() => this.addClassActiveLink(link)}>
              <li className={"navbar-link" + (state ? ' active-link' : '')}>
                <FontAwesomeIcon icon={icon}/>
              </li>
            </Link>
  }

  render(){
    return(
      <Router>
        <div className= 'row'>
          <div className= 'col s12 revert-padding-col'>
            <div className='private-nav'>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                { this.buildLink('dashboard', this.state.activeDashboard, faConciergeBell)}
                { this.buildLink('search', this.state.activeSearch, faSearch)}
                { this.buildLink('favorite', this.state.activeFavorite, faStar)}
                { this.buildLink('calendar', this.state.activeCalendar, faCalendarWeek)}
                <a href='/users/sign_out' data-method="delete" rel="nofollow">
                  <li className='navbar-link'><FontAwesomeIcon icon={faSignOutAlt}/></li>
                </a>
              </ul>
            </div>
          </div>
          <div className='col s12 l11 offset-l1'>
            <Route
              exact path='/private/:userId/dashboard'
              component={Dashboard}
              userId={this.props.userId}
            />
          </div>
          <div className='col s12 l11 offset-l1'>
            <Route
              exact path='/private/:userId/search'
              component={LiveSearch}
              userId={this.props.userId}
            />
          </div>
          <div className='col s12 l11 offset-l1'>
            <Route
              exact path='/restaurant/:id'
              component={Restaurant}
            />
          </div>
          <div className='col s12 l11 offset-l1'>
            <Route
              path='/private/:userId/favorite'
              component={Favorite}
              userId={this.props.userId}
            />
          </div>
          <div className='col s12 l11 offset-l1'>
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
