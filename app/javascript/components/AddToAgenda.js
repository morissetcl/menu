import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class AddToAgenda extends Component {

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    $('.modal').modal();
  }

  render(){
    return (
      <div>
      <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
      </div>
    )
  }
}

export default AddToAgenda
