import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from './RestaurantCard'

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteResults: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  getFavorites() {
    $.getJSON('/private/1/favorite',(res) =>
    {
      this.setState({favoriteResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  handleDelete(id){
   iziToast.success({icon: 'fa fa-trash', message: 'Restaurant retiré de vos favoris'});
   fetch(`/private/1/favorite/${id}`,
   {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     }
   }).then((response) => {
       this.getFavorites()
     })
  }

  componentDidMount() {
    this.getFavorites()
  }

  render(){
    let favoritesRestaurants = this.state.favoriteResults.map((response, index) => {
      return <div key={index} className='restaurant-wrapper col s12 m4'>
              <RestaurantCard response= { response } fromFavorite={true} handleDelete={this.handleDelete}/>
             </div>
    });

    return (
      <div className='row'>
        <div className='col s12'>
          { favoritesRestaurants }
        </div>
      </div>
    )
  }
}

export default Favorite
