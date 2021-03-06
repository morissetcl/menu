import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from './RestaurantCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons'
import Loader from './reusable_components/Loader';
import { getFavorites, deleteFavorite } from '../apis/Favorite'

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.userId,
      favoriteResults: [],
      loaded: false
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id){
   iziToast.show({
     backgroundColor: 'rgba(238,110,115,0.9)',
     theme: 'dark',
     icon: 'fa fa-trash',
     message: 'Restaurant retiré de vos favoris',
     timeout: 2500
   })
   deleteFavorite(this.state.userId, id).then(data => {
     this.retrieveFavoriteRestaurant();
   });
  }

  componentDidMount() {
    this.retrieveFavoriteRestaurant();
  }

  retrieveFavoriteRestaurant() {
    getFavorites(this.state.userId).then(data => {
      this.setState({loaded: true, favoriteResults: data})
    });
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
          {this.state.loaded ?
            <div>
            {favoritesRestaurants.length > 0 ?
              <div className="result-wrapper row">
                { favoritesRestaurants }
              </div>
              :
              <div className="no-favorites-yet"><p>
                Oups vous n'avez pas encore de favoris..
                </p><FontAwesomeIcon
                  icon={faBabyCarriage}
                  className='super'
                />
              </div>
            }
            </div>
            : <Loader/>
          }
        </div>
      </div>
    )
  }
}

export default Favorite
