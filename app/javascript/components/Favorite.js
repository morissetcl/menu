import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from './RestaurantCard'

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteResults: [],
      userId: '1'
    }
  }

  componentDidMount() {
    $.getJSON('/private/1/favorite',(res) =>
    {
      this.setState({favoriteResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  render(){
    let favoritesRestaurants = this.state.favoriteResults.map((response, index) => {
      return <div key={index} className='restaurant-wrapper col s12 m4'>
              <RestaurantCard response= { response } userId= { this.state.userId }/>
             </div>
    });

    return (
      <div className='restaurant-show'>
        <div className='row'>
          <div className='col s12 m9 offset-m3'>
            { favoritesRestaurants }
          </div>
        </div>
      </div>
    )
  }
}

export default Favorite
