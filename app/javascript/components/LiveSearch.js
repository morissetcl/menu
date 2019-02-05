import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RestaurantCard from './RestaurantCard'
import Loader from './reusable_components/Loader';

class LiveSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      autoCompleteResults: [],
      itemSelected: {},
      showItemSelected: false,
      loaded: false
    };
  }

  componentDidMount() {
    $.getJSON('/private/:user_id/dashboard/recherche?q=' + this.state.term)
      .then(response => this.setState({ autoCompleteResults: response.restaurants, loaded: true }))
  }

  getAutoCompleteResults(e){
    this.setState({
      term: e.target.value
    }, () => {
      $.getJSON('/private/:user_id/dashboard/recherche?q=' + this.state.term)
        .then(response => this.setState({ autoCompleteResults: response.restaurants }))
    });
  }

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response, index) => {
      return <div key={index} className='restaurant-wrapper col s12 m4 l3'>
              <RestaurantCard response= { response } userId= { this.props.match.params.userId } restaurantId={response.id}/>
             </div>
    });

    return (
      <div className='filter-container col s12'>
      <div className='header-filter'>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder="Recherche par nom ou adresse" className='recherche-input' />
        {autoCompleteList.length == 250 ? (
          <span className='counter'>+ de { autoCompleteList.length }</span>
        ) : (
          <span className='counter'>{ autoCompleteList.length }</span>
        )}
      </div>
      {this.state.loaded ?
        <div className="result-wrapper row">
          { autoCompleteList }
        </div>
        :  <Loader/>
      }
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var new_row = document.createElement("div");
  new_row.setAttribute("class", "livesearch-container row" );

  ReactDOM.render(
    <LiveSearch />,
    document.body.appendChild(new_row),
  )
});

export default LiveSearch
