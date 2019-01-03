import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
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
      });
    }
  }



  render(){
    return (
      <div className='restaurant-show'>
        <li>{this.state.restaurant.name}</li>
      </div>
    )
  }
}

export default Restaurant
