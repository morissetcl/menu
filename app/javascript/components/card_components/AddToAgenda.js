import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class AddToAgenda extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booked: props.is_booked
    };
  };

  displayFormCalendar() {
    $('.restaurant-informations-container').toggleClass('hidden')
    $('#calendar-form').toggleClass('hidden')
  }

  render(){
    const isBooked = this.state.booked;
    return (
      <div>
        <div id="calendar-icon" id={isBooked ? "already-booked" : "not-yet-favorite"} href="#modal1" onClick={() => { this.displayFormCalendar()}}>
          <FontAwesomeIcon
            icon={faCalendarWeek}
            className='super'
          />
        </div>
      </div>
    )
  }
}

export default AddToAgenda
