import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Restaurant extends Component {

  render(){
    return (
      <div className='filter-container col s12'>
        <span>{this.props.restaurantName}</span>
      </div>
    )
  }
}

export default Restaurant
