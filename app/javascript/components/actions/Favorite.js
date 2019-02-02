import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from '../RestaurantCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons'

class Favorite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.userId,
      favoriteResults: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  getFavorites() {
    $.getJSON('/private/' + this.state.userId + '/favorite',(res) =>
    {
      this.setState({favoriteResults: jQuery.parseJSON(JSON.stringify(res))});
    });
  }

  handleDelete(id){
   iziToast.show({
     backgroundColor: 'rgba(238,110,115,0.9)',
     theme: 'dark',
     icon: 'fa fa-trash',
     message: 'Restaurant retiré de vos favoris',
     timeout: 2500
   })
   fetch(`/private/${this.state.userId}/favorite/${id}`,
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
      </div>
    )
  }
}

export default Favorite
