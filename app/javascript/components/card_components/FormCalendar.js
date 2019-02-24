import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class FormCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      restaurantId: props.restaurantId,
      userId: props.userId,
      title: '',
      events: [],
      booked: props.is_booked
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };


  handleDateChange() {
    var date = $('#date_event').val();
    var title = $('#title_event').val();
    this.setState({date: date, title: title});
    this.handleFormSubmit(date, title)
    $('#calendar-form').toggleClass('hidden').fadeIn(10000)
    $('.restaurant-informations-container').toggleClass('hidden').fadeIn(10000)
  }

  handleFormSubmit(date, title){
    let body = JSON.stringify({event: {date: date, user_id: this.state.userId, restaurant_id: this.state.restaurantId, title: title }})

    fetch(process.env.BASE_URL + "/event", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
      .then((event)=>{
        this.addNewEvent(event)
      })

      iziToast.show({
        backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
        message: 'Évenement ajouté à votre agenda',
        timeout: 2500
      })
      this.setState({booked: true});
      $('#not-yet-booked').attr('id', 'already-booked');
      $('input').val('');
  }

  addNewEvent(event){
    this.setState({
      events: this.state.events.concat(event)
    })
  }

  render(){
    return (
      <div id="calendar-form" className="hidden">
        <div className="input-field">
          <label>Description</label>
          <input
            type="text"
            id='title_event'
            className='input-field '
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            id='date_event'
            className='input-field datepicker'
            placeholder='Date'
          />
        </div>
        <input className='modal-close waves-effect waves-light btn' type="submit" value="Ajouter" onClick={() => { this.handleDateChange()}}/>
      </div>
    )
  }
}

export default FormCalendar
