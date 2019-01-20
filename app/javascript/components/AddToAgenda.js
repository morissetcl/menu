import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

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
        <FontAwesomeIcon icon={faCalendarWeek}/><input type="text" class="datepicker"/>
      </div>
    )
  }
}

export default AddToAgenda
