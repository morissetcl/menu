import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteResults: []
    };
  }

  componentDidMount() {
    $.getJSON('/private/1/favorite', (res) =>
    {
      this.setState({favoriteResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  render(){
    let favoritesRestaurants = this.state.favoriteResults.map((response, index) => {
      return <p key={index}>{response.restaurant_id}</p>
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
