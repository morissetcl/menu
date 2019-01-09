import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Favorite extends Component {

  constructor(props) {
    console.log(props)
    super(props);
  };

  componentDidMount() {
    
  }

  render(){
    return (
      <div className='restaurant-show'>
        <div className='row'>
          <div className='col s12 m9 offset-m3'>
            <p>{this.props.favorites.name}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Favorite
