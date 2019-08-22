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
      loaded: false,
      userId: this.props.match.params.userId
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
      return <div key={index} className='restaurant-wrapper col s12 m4 l4'>
              <RestaurantCard response= { response } userId= { this.state.userId } restaurantId={response.id}/>
             </div>
    });

    return (
      <div className='filter-container col s12'>
      <div className='header-filter'>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder="Recherche par nom ou adresse" className='recherche-input' />
        {autoCompleteList.length == 250 ? (
          <span className='counter badge hide-on-small-only'>+ de { autoCompleteList.length }</span>
        ) : (
          <span className='counter badge'>{ autoCompleteList.length }</span>
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

export default LiveSearch
