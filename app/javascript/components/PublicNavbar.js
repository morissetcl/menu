import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PublicNavbar extends Component {

  constructor(props) {
    console.log(props)
    super(props);
  };

  render(){
    return(
      <Router>
        <nav class="nav-color">
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo">Logo</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              {this.props.userSignedIn ?
                <li><a href={`/private/${this.props.currentUser.id}/dashboard`} rel="nofollow">Dashboard</a></li>
              :
              <li><a href='/users/sign_in' rel="nofollow">Connexion</a></li>
              }
            </ul>
          </div>
        </nav>


      </Router>
    )
  };
}
export default PublicNavbar;
