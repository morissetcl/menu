import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
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
      <div className='restaurant-card card'>
      { this.props.fromFavorite
        ? <div className='trash-favorite'onClick={() => this.props.handleDelete(restaurantId)}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </div>
        : null
      }
      <Link to={'/restaurant/' + restaurantId }>
          <div className='restaurant-name'>
            <span className="grey-text text-darken-4 truncate">{this.props.response.name}</span>
          </div>
          <div className='restaurant-informations'>
            <span><FontAwesomeIcon icon={faMapMarkerAlt}/>{this.props.response.full_address}</span>
            <p><FontAwesomeIcon icon={faUtensils}/> {this.props.response.dishes_count}</p>
            <div className='badges-wrapper'>
              {this.props.response.tags.map(function (item, i) {
                return <div key={i} className='badge truncate'>
                          {item}
                        </div>

              })}
            </div>
          </div>
          </Link>
      </div>
      </div>
    );
  };
}

export default RestaurantCard
