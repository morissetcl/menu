import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FavoriteStar from '../card_components/FavoriteStar';
import AddToAgenda from '../card_components/AddToAgenda';
import Comments from '../card_components/Comments';

class Actions extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='restaurant-actions'>
        <div className={this.props.isFavorite ? "already-favorite" : "not-yet-favorite"}>
          <FavoriteStar
            restaurantId={this.props.restaurant.id}
            restaurantName={this.props.restaurant.name}
            userId={this.props.currentUser}
            ></FavoriteStar>
        </div>
        <AddToAgenda
          is_booked={this.props.isBooked}
          restaurantId={this.props.restaurant.id}
          userId={this.props.currentUser}
        />
        <div className={this.props.isCommented ? "already-commented" : "not-yet-commented"}>
          <Comments
            restaurantId={this.props.restaurant.id}
            userId={this.props.currentUser}
          />
        </div>
      </div>
    )
  }
}

export default Actions
