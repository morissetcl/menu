import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'
import Favorite from './Favorite'
import Calendar from './Calendar'

class PrivateNavbar extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    $('.navbar-link').click(function () {
      $('.navbar-link').removeClass("active-link");
      $(this).addClass("active-link");
    });
  }

  render(){
    return(
      <Router>
        <div className= 'row'>
          <div className= 'col s2'>
            <div className='private-nav'>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <Link to={`/private/${this.props.userId}/dashboard`}>
                  <li className='navbar-link'>
                    <FontAwesomeIcon icon={faSearch}/>
                    Recherche
                  </li>
                </Link>
                <Link to={`/private/${this.props.userId}/favorite`}>
                  <li className='navbar-link'>
                    <FontAwesomeIcon icon={faStar}/>
                    Mes favoris
                  </li>
                </Link>
                <Link to={`/private/${this.props.userId}/calendar`}>
                  <li className='navbar-link'>
                    <FontAwesomeIcon icon={faStar}/>
                    Calendrier
                  </li>
                </Link>
                <a href='/users/sign_out' data-method="delete" rel="nofollow">
                  <li className='navbar-link'><FontAwesomeIcon icon={faSignOutAlt}/>Déconnexion</li>
                </a>
              </ul>
            </div>
          </div>
          <div className='col s10'>
            <Route
              exact path='/private/:userId/dashboard'
              component={LiveSearch}
              userId={this.props.userId}
            />
          </div>
          <div className='col s10 offset-s2'>
            <Route
              exact path='/restaurant/:id'
              component={Restaurant}
            />
          </div>
          <div className='col s10 offset-s2'>
            <Route
              path='/private/:userId/favorite'
              component={Favorite}
              userId={this.props.userId}
            />
          </div>
          <div className='col s10 offset-s2'>
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
