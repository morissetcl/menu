import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class User extends Component {

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
      return <div key={index} className='restaurant-wrapper'>
          <h4 className='titre-restaurant'>{response.name}</h4>
          <p>{response.street}</p>
          <p>{response.city}</p>
          <p>{response.zip_code}</p>
        </div>
    });

    return (
      <div class='coucou'>
        <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder='Recherche par nom ou ville' className='recherche-input' />
        <h4 className='counter'> { autoCompleteList.length } </h4>
        { autoCompleteList }
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var new_row = document.createElement("div");
  new_row.setAttribute("class", "livesearch-container" );

  ReactDOM.render(
    <User />,
    document.body.appendChild(new_row),
  )
});
