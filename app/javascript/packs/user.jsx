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

    $.getJSON('/recherche?q=' + this.state.term)
      console.log(response)
      .then(response => this.setState({ autoCompleteResults: response.restaurants }))
  }

  getAutoCompleteResults(e){
    this.setState({
      term: e.target.value
    }, () => {
      $.getJSON('/recherche?q=' + this.state.term)
        .then(response => this.setState({ autoCompleteResults: response.restaurants }))
    });
  }

  render(){
    let autoCompleteList = this.state.autoCompleteResults.map((response, index) => {
      console.log(response)
      return <div key={index} className='restaurant-wrapper'>
          <h4 className='titre-restaurant'>{response.name}</h4>
          <p>{response.street}</p>
          <p>{response.city}</p>
          <p>{response.zip_code}</p>
        </div>
    });

    return (
      <div>
        <div id='namer'>
          <div id="namer-input">
            <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text' placeholder='Recherche par nom ou ville' className='recherche-input' />
          </div>
        </div>
        <h4 className='counter'> { autoCompleteList.length } </h4>
        <div class='restaurants-container'>
          <div className='restaurants-content'>
            { autoCompleteList }
          </div>
        </div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
});
