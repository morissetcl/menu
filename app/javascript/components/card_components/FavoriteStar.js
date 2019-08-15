import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class FavoriteStar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isFavorite: props.isFavorite,
    };
  };

  handleFormSubmit(restaurant, user){
    let body = JSON.stringify({ favorite: { restaurant_id: restaurant, user_id: user } })

    fetch(process.env.BASE_URL + '/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
      .then((favorite)=>{
        this.addNewFavorite(favorite)
      })
    this.setState({ isFavorite: true }, () => console.log("Y'a pas moyen Djadja"))
  }

  displayToast() {
    iziToast.show({
      backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
      icon: 'fa fa-star',
      message: 'Ajouté à vos favoris',
      timeout: 2500
    })
  }

  addNewFavorite(favorite){
    this.displayToast();
    this.setState({
      favorites: this.state.favorites.concat(favorite)
    })
  }

  componentDidMount() {
    $('.tooltipped').tooltip();
  }

  render(){
    return (
      <div className={this.state.isFavorite ? "already-favorite" : "not-yet-favorite"}>
        <span
          className='star waves-light'
          data-position="bottom"
          onClick={() => { this.handleFormSubmit(this.props.restaurantId, this.props.userId) }}>
          <FontAwesomeIcon icon={faStar}/>
        </span>
      </div>
    )
  }
}

export default FavoriteStar
