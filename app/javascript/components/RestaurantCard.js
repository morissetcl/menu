import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'

class RestaurantCard extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <a href={'/private/' + this.props.userId + '/dashboard/restaurant/' + this.props.response.id}>
        <div className='coucou card'>
          <div className="card-content">
            <span className="card-title grey-text text-darken-4">{this.props.response.name}</span>
            <span>{this.props.response.street}</span>
            <span>{this.props.response.city}</span>
            <span>{this.props.response.zip_code}</span>
          </div>
        </div>
      </a>
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
