import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'

class FavoriteStar extends Component {

  constructor(props) {
    super(props);
  };

  render(){
    function addFavorite() {
      console.log('The link was clicked.');
    }

    return (
      <div>
        <span onClick={addFavorite}><FontAwesomeIcon icon={faStar} /></span>
      </div>
    )
  }
}

export default FavoriteStar
