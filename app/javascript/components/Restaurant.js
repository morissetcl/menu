import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
    return (
      <div className='restaurant-show'>
        <li>{this.state.restaurant.name}</li>
        <li>{this.state.restaurant.street}</li>
        <li>{this.state.restaurant.city}</li>
        <li>{this.state.restaurant.zip_code}</li>
        <li>{this.state.restaurant.tags}</li>
        <table className='responsive-table highlight'>
          <thead>
            <tr>
              <th>Intitulé</th>
              <th>Description</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dishes.map(function (item, i) {
              return  <tr key={i}>
                         <td>{item.title}</td>
                         <td>{item.description}</td>
                         <td>{item.price} €</td>
                       </tr>

            })}
          </tbody>
          </table>
      </div>
    )
  }
}

export default Restaurant
