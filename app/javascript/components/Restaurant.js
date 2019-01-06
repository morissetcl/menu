import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      dishes: []
    };
  }

  componentWillMount() {
    if(this.props.match === undefined) {
      ''
    } else {
      $.getJSON('/restaurant/' + this.props.match.params.id,
      (res) =>
      {
        this.setState({restaurant: jQuery.parseJSON(JSON.stringify(res))});
        this.setState({dishes: this.state.restaurant.dishes});
      });
    }
  }

  render(){
    const AnyReactComponent = ({ text }) => (
      <div className='cluster-map'> </div>
    );

    return (
      <div className='restaurant-show'>
        <div className='row'>
          <div className='col s12'>
            <div className='restaurant-container col s12'>
              <div className='restaurant-content'>
                <li>{this.state.restaurant.name}</li>
                <li>{this.state.restaurant.street}</li>
                <li>{this.state.restaurant.city}</li>
                <li>{this.state.restaurant.zip_code}</li>
                <li>{this.state.restaurant.tags}</li>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m8 offset-m4'>
            {this.state.dishes.map(function (item, i) {
              return <div key={i} className='restaurant-wrapper col s12 m6'>
                        <div className='card dish-card'>
                          <p>{item.title}</p>
                          <p>{item.description}</p>
                          <p>{item.price} €</p>
                        </div>
                      </div>
            })}
          </div>
          <div className='col s12 m4 map-wrapper'>
            <div style={{ height: '335px', width: '85%', marginTop: '7.5px' , paddingLeft: '10px', paddingBottom: '10px'}}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                center={{lat: this.state.restaurant.latitude, lng: this.state.restaurant.longitude}}
                defaultZoom={15}
              >
              <AnyReactComponent/>
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant
