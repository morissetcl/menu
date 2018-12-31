import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Restaurant extends Component {

  render(){
    return (
      <div className='filter-container col s12'>
        <li>{this.props.resto}</li>
      </div>
    )
  }
}

export default Restaurant
