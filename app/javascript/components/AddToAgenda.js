import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

class AddToAgenda extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      restaurantId: 80435,
      userId: 1,
      events: []
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleDateChange() {
    var date = $('#date_event').val();
    this.setState({date: date});
    this.handleFormSubmit(date)
  }

  handleFormSubmit(date){
    let body = JSON.stringify({event: {date: date, user_id: this.state.userId, restaurant_id: this.state.restaurantId} })

  fetch('http://localhost:3000/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((event)=>{
      this.addNewEvent(event)
    })
  }

  addNewEvent(event){
    this.setState({
      events: this.state.events.concat(event)
    })
  }

  componentDidMount() {
    $('.modal').modal();
  }

  render(){
    return (
      <div>
        <FontAwesomeIcon icon={faCalendarWeek}/>
        <input
          type="text"
          onChange={this.handleDateChange}
          className='datepicker'
          id='date_event'
        />
        <input type="submit" value="Update Post" onClick={() => { this.handleDateChange()}}/>
      </div>
    )
  }
}

export default AddToAgenda
