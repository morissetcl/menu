import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PublicNavbar extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    $('.sidenav').sidenav();
  }

  checkIfUserIsConnected(signIn) {
    if (signIn) {
      return <li><a href={`/private/${this.props.currentUser.id}/dashboard`} rel="nofollow">Dashboard</a></li>
    } else {
      return <li><a href='/users/sign_in' rel="nofollow">Connexion</a></li>
    }
  }

  render(){
    return(
      <Router>
        <nav class="nav-color">
          <div class="nav-wrapper">
            <a href="/" class="brand-logo">Menu</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              { this.checkIfUserIsConnected(this.props.userSignedIn) }
            </ul>
          </div>
            <ul class="sidenav" id="mobile-demo">
              { this.checkIfUserIsConnected(this.props.userSignedIn) }
            </ul>
        </nav>
      </Router>
    )
  };
}
export default PublicNavbar;
