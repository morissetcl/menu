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
      <Link to={'/restaurant/' + this.props.response.id}>
        <div className='restaurant-card card'>
          <div>
            <span className="card-title grey-text text-darken-4">{this.props.response.name}</span>
            <span>{this.props.response.street}</span>
            <span>{this.props.response.city}</span>
            <span>{this.props.response.zip_code}</span>
          </div>
        </div>
      </Link>
    );
  };
}

export default RestaurantCard
