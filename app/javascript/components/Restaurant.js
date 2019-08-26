import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import Loader from './reusable_components/Loader';
import FormCalendar from './card_components/FormCalendar';
import Actions from './restaurant/Actions';
import { getRestaurant } from '../apis/Restaurant'

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      dishes: [],
      current_user: '',
      favorite: false,
      loaded: false,
      commented: false,
    };
  }

  componentDidMount() {
    const restaurant_params = this.props.match ? this.props.match.params : this.props.restaurant

    getRestaurant((restaurant_params.id)).then(data => {
      this.setState({restaurant: jQuery.parseJSON(JSON.stringify(data))});
      this.setState({dishes: this.state.restaurant.dishes});
      this.setState({current_user: this.state.restaurant.user_id});
      this.setState({favorite: this.state.restaurant.favorite});
      this.setState({booked: this.state.restaurant.booked});
      this.setState({commented: this.state.restaurant.commented});

      this.setState({loaded: true})
    });
  }

  componentDidUpdate() {
    $('.modal').modal();
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
                    <th>Plat</th>
                    <th>Description</th>
                    <th>Prix (€)</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.state.dishes.map(function (item, i) {
                    return <tr key={i}>
                              <td className='dish-title'>{item.title}</td>
                              <td className='dish-description'>{item.description}</td>
                              <td className='dish-price'>{item.price}</td>
                            </tr>

                  })}
                </tbody>
              </table>
            </div>
            <div className='col s12 m3 map-wrapper hide-on-small-only'>
              <Actions
                currentUser={this.state.current_user}
                restaurant={this.state.restaurant}
                userId={this.state.current_user}
                isCommented={this.state.commented}
                isFavorite={this.state.favorite}
                isBooked={this.state.booked}/>
              <div className='restaurant-informations-container'>
                <div className='restaurant-content' style={{ width: '85%', padding: '10px' }}>
                  <li className='cou' style={{ fontWeight: 'bold' }}>{this.state.restaurant.name}</li>
                  <li>{this.state.restaurant.street}</li>
                  <div className='cp-city'>
                    <li>{this.state.restaurant.city}</li>
                    <li>{this.state.restaurant.zip_code}</li>
                  </div>
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
              <FormCalendar
                restaurantId={this.state.restaurant.id}
                userId={this.state.current_user}
                isBooked={this.isBooked}
              />
            </div>
          </div>
          :  <Loader/>
           }
      </div>
    )
  }
}

export default Restaurant
