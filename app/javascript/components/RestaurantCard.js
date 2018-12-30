import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class RestaurantCard extends Component {

  constructor(props) {
    console.log(props)
    super(props);
  }

  render(){
    return (
      <div className=" coucou card">
        <div className="card-content">
          <span className="card-title grey-text text-darken-4">{this.props.response.name
}</span>
          <span>{this.props.response.street
}</span>
          <span>{this.props.response.city}</span>
          <span>{this.props.response.zip_code}</span>
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var new_row = document.createElement("div");
  new_row.setAttribute("class", "livesearch-container row" );

  ReactDOM.render(
    <RestaurantCard />,
    document.body.appendChild(new_row),
  )
});

export default RestaurantCard
