import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

class FavoriteStar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  };

  handleFormSubmit(restaurant, user){
    let body = JSON.stringify({favorite: {restaurant_id: restaurant, user_id: user} })

  fetch('http://localhost:3000/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((favorite)=>{
      this.addNewFavorite(favorite)
    })
  }

  addNewFavorite(favorite){
    this.setState({
      favorites: this.state.favorites.concat(favorite)
    })
  }

  render(){
    return (
      <div>
        <span id="infoClick" className='star waves-light
' onClick={() => { this.handleFormSubmit(this.props.restaurantId, this.props.userId) }}><FontAwesomeIcon icon={faStar}/> </span>
      </div>
    )
  }
}

export default FavoriteStar
