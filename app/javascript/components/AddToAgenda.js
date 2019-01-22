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
  }

  handleFormSubmit(date, title){
    let body = JSON.stringify({event: {date: date, user_id: this.state.userId, restaurant_id: this.state.restaurantId, title: title }})

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

      iziToast.show({
        backgroundColor: 'rgba(238,110,115,0.9)',
        theme: 'dark',
        message: 'Évenement ajouté à votre agenda',
        timeout: 2500
      })
      this.setState({booked: true});
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
    const isBooked = this.state.booked;
    console.log(this.state)
    console.log(')-)-)-)-)-')
    return (
      <div>
        <div className="modal-trigger" id={isBooked ? "already-booked" : "not-yet-favorite"} href="#modal1">
          <FontAwesomeIcon
            icon={faCalendarWeek}
            className='super'
          />
        </div>
        <div id="modal1" class="modal bottom-sheet">
          <div class="modal-content">
            <h5>Ajouter cet établissement à votre agenda</h5>
            <div class="input-field">
              <label for="title_event">Descriptions</label>
              <input
                type="text"
                id='title_event'
                className='input-field '
              />
            </div>
            <div class="input-field">
              <input
                type="text"
                id='date_event'
                className='input-field datepicker'
                placeholder='Date'
              />
            </div>
            <input className='modal-close' type="submit" value="Ajouter" onClick={() => { this.handleDateChange()}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddToAgenda
