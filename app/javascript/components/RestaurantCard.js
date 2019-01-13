import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import LiveSearch from './LiveSearch'
import Restaurant from './Restaurant'

class RestaurantCard extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    var restaurantId= this.props.response.restaurant_id ? this.props.response.restaurant_id : this.props.response.id
    return (
      <div>
      <Link to={'/restaurant/' + restaurantId }>
        <div className='restaurant-card card'>
          <div>
            <span className="card-title grey-text text-darken-4">{this.props.response.name}</span>
            <span>{this.props.response.street}</span>
            <span>{this.props.response.city}</span>
            <span>{this.props.response.zip_code}</span>
            <p>{this.props.response.dishes_count}</p>
          </div>
        </div>
      </Link>
      { this.props.fromFavorite
        ? <div className='trash-favorite'onClick={() => this.props.handleDelete(restaurantId)}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </div>
        : null
      }
      </div>
    );
  };
}

export default RestaurantCard
