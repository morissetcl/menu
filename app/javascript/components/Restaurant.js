import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Restaurant extends Component {

  constructor(props) {
    super(props);
  };

  render(){
    return (
      <div className='filter-container col s12'>
        <span>{this.props.restaurant.name}</span>
      </div>
    )
  }
}

export default Restaurant
