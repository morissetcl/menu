import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import FavoriteStar from './FavoriteStar';

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      dishes: []
    };
  }

  componentDidMount() {
    $.getJSON('/restaurant/' + this.props.match.params.id,
    (res) =>
    {
      this.setState({restaurant: jQuery.parseJSON(JSON.stringify(res))});
      this.setState({dishes: this.state.restaurant.dishes});
    });
  }

  render(){
    const MarkerMap = ({ text }) => (
      <div className='cluster-map'> </div>
    );

    return (
      <div className='restaurant-show'>
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
            <div className='restaurant-content' style={{ width: '85%' }}>
              <FavoriteStar/>
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
                defaultZoom={15}
              >
                <MarkerMap/>
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant
