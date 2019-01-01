import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Restaurant extends Component {

  constructor(props) {
    console.log(props)
    super(props);
  }

  render(){
    return (
      <div className='filter-container col s12'>
        <li>{this.props.restaurant.address}</li>
      </div>
    )
  }
}

export default Restaurant
