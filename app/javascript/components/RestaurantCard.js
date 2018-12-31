import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { matchPath } from "react-router";
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'

class RestaurantCard extends Component {

  render(){
    return (
      <div>
        <Link to={`/private/${this.props.userId}/dashboard/restaurant/${this.props.response.id}`}>
          <div className="coucou card">
            <div className="card-content">
              <span className="card-title grey-text text-darken-4">{this.props.response.name}</span>
              <span>{this.props.response.street}</span>
              <span>{this.props.response.city}</span>
              <span>{this.props.response.zip_code}</span>
            </div>
          </div>
        </Link>
        <div className='col s10'>
          <Restaurant/>
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
