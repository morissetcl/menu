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
        <FavoriteStar
          restaurantId={this.props.restaurant.id}
          restaurantName={this.props.restaurant.name}
          userId={this.props.currentUser}
          isFavorite={this.props.isFavorite}
          ></FavoriteStar>
        <AddToAgenda
          is_booked={this.props.isBooked}
          restaurantId={this.props.restaurant.id}
          userId={this.props.currentUser}
        />
        <Comments
          restaurantId={this.props.restaurant.id}
          userId={this.props.currentUser}
          isCommented={this.props.isCommented}
        />
      </div>
    )
  }
}

export default Actions
