import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'


class PrivateNavbar extends Component {

  constructor(props) {
    console.log('private navbar')
    super(props);
  };

  render(){
    return(
      <Router>
        <div className= 'row'>
          <div className= 'col s2'>
            <div className='private-nav'>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <Link to={`/private/${this.props.userId}/dashboard`}>Recherche</Link>
                </li>
                <li>
                  <Link to="/bouyaka">Recherche</Link>
                </li>
                <li>
                  <a href='/users/sign_out' data-method="delete" rel="nofollow">Déconnexion</a>
                </li>
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
          <div className='col s10'>
            <Route
              exact path='/bouyaka'
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
        </div>
      </Router>
    )
  };
}
export default PrivateNavbar;
