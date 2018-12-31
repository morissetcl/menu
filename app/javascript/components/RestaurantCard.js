import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { matchPath } from "react-router";
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'

class RestaurantCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: !this.state.showComponent
    })
  }

  render(){
    return (
      <div>
        <div className={this.state.showComponent ? 'coucou card keep' : 'coucou card'} onClick={this._onButtonClick}>
          <div className="card-content">
            <span className="card-title grey-text text-darken-4">{this.props.response.name}</span>
            <span>{this.props.response.street}</span>
            <span>{this.props.response.city}</span>
            <span>{this.props.response.zip_code}</span>
          </div>
        </div>
        <div>
          {this.state.showComponent ?  <Restaurant resto={this.props.response.name}/> : null }
        </div>
      </div>
    )
  };
}

document.addEventListener('DOMContentLoaded', () => {
  var new_row = document.createElement("div");
  new_row.setAttribute("class", "livesearch-container row" );

  ReactDOM.render(
    <RestaurantCard />,
    document.body.appendChild(new_row),
  )
});

export default RestaurantCard
