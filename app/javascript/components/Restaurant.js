import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import FavoriteStar from './card_components/FavoriteStar';
import Loader from './reusable_components/Loader';
import AddToAgenda from './card_components/AddToAgenda';
import Comments from './card_components/Comments';

class Restaurant extends Component {

  constructor(props) {
    $('.modal').modal();
    super(props);
    this.state = {
      restaurant: [],
      dishes: [],
      current_user: '',
      favorite: false,
      loaded: false
    };
  }

  componentDidMount() {
    $('.modal').modal();

    $.getJSON('/restaurant/' + this.props.match.params.id,
    (res) =>
    {

      this.setState({restaurant: jQuery.parseJSON(JSON.stringify(res))});
      this.setState({dishes: this.state.restaurant.dishes});
      this.setState({current_user: this.state.restaurant.user_id});
      this.setState({favorite: this.state.restaurant.favorite});
      this.setState({booked: this.state.restaurant.booked});

      this.setState({loaded: true})
    })
  }

  componentDidUpdate() {
    $('.modal').modal();
    $('#infoClick').click(function () {
      $(this).addClass('already-favorite')
      iziToast.show({
        backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
        icon: 'fa fa-star',
        message: 'Ajouté à vos favoris',
        timeout: 2500
      })
    });
    $('.datepicker').datepicker({
      i18n: {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
          'Octobre','Novembre', 'Décembre'],
        weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',   'Dimanche'],
        cancel: ['Annuler'],
        done: ['Valider']
      }
    });
  }

  render(){
    const isFavorite = this.state.favorite;
    const isBooked = this.state.booked;

    const MarkerMap = ({ text }) => (
      <div className='cluster-map'> </div>
    );

    return (
      <div className='restaurant-show'>
        {this.state.loaded ?
          <div className='row'>
            <div className='col s12 m9 offset-m3'>
              <table className='highlight dish-table'>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Prix (€)</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.dishes.map(function (item, i) {
                    return <tr key={i}>
                              <td>{item.title}</td>
                              <td className='dish-description'>{item.description}</td>
                              <td>{item.price}</td>
                            </tr>

                  })}
                </tbody>
              </table>
            </div>
            <div className='col s12 m3 map-wrapper'>
              <div className='restaurant-actions'>
                <div className={isFavorite ? "already-favorite" : "not-yet-favorite"}>
                  <FavoriteStar
                    restaurantId={this.state.restaurant.id}
                    restaurantName={this.state.restaurant.name}
                    userId={this.state.current_user}
                    ></FavoriteStar>
                </div>
                <AddToAgenda
                  is_booked={isBooked}
                  restaurantId={this.state.restaurant.id}
                  userId={this.state.current_user}
                />
                <Comments
                  restaurantId={this.state.restaurant.id}
                  userId={this.state.current_user}
                />
              </div>
              <div className='restaurant-content' style={{ width: '85%' }}>
                <li>{this.state.favorite}</li>
                <li>{this.state.restaurant.name}</li>
                <li>{this.state.restaurant.street}</li>
                <li>{this.state.restaurant.city}</li>
                <li>{this.state.restaurant.zip_code}</li>
                <li>{this.state.restaurant.tags}</li>
              </div>
              <div style={{ height: '335px', width: '85%', paddingBottom: '10px'}}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: '' }}
                  center={{lat: this.state.restaurant.latitude, lng: this.state.restaurant.longitude}}
                  defaultZoom={15}>
                  <MarkerMap
                    lat={this.state.restaurant.latitude}
                    lng={this.state.restaurant.longitude}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
          :  <Loader/>
           }
      </div>
    )
  }
}

export default Restaurant
