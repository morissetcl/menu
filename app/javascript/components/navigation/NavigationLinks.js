import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faSearch, faSignOutAlt, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class NavigationLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  };

  handleClick(element) {
    element.setState({isActive : !element.state.isActive});
  }

  render() {
    var checkIfActive = this.state.isActive ? 'active-link' : '';
    return (
      <div>
        <Link to={this.props.path}>
          <li className={'navbar-link ' + checkIfActive } onClick={() => this.handleClick(this)}>
            <FontAwesomeIcon icon={this.props.icon}/>
          </li>
        </Link>
      </div>
    )
  };
}

export default NavigationLinks;
