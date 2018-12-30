import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class LiveSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      autoCompleteResults: [],
      itemSelected: {},
      showItemSelected: false
    };

    $.getJSON('/private/:user_id/dashboard/recherche?q=' + this.state.term)
      .then(response => this.setState({ autoCompleteResults: response.restaurants }))
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
      return <div key={index} className='restaurant-wrapper col s12 m4'>
                <div className=" coucou card">
                  <div className="card-content">
                    <span className="card-title grey-text text-darken-4">{response.name}</span>
                    <span>{response.street}</span>
                    <span>{response.city}</span>
                    <span>{response.zip_code}</span>
                  </div>
                </div>
             </div>
    });

    return (
      <div className='filter-container col s10 offset-s2'>
      <div className='header-filter'>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder="Recherche par nom ou adresse" className='recherche-input' />
        {autoCompleteList.length == 500 ? (
          <span className='counter'>+ de { autoCompleteList.length }</span>
        ) : (
          <span className='counter'>{ autoCompleteList.length }</span>
        )}
      </div>
      <div className="result-wrapper row">
          { autoCompleteList }
      </div>
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
