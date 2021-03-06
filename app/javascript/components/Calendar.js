import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      mounted: false
    }
  }

  componentDidMount() {
    $.getJSON('/private/1/calendar',(res) =>
    {
      this.setState({eventsList: [...this.state.eventsList, jQuery.parseJSON(JSON.stringify(res))]});
      this.setState({mounted: true})
    });
  }

  render(){
    function Event({ event }) {
      return (
        <span>
          <strong>{event.restaurant.name}</strong>
        </span>
      )
    }

    const localizer = BigCalendar.momentLocalizer(moment);
    let myEventsList;

    if (this.state.eventsList[0] != undefined) {
      myEventsList = this.state.eventsList[0].events
    } else {
      myEventsList = this.state.eventsList
    }

    const messages = {
      allDay: 'journée',
      previous: 'précédent',
      next: 'suivant',
      today: 'aujourd\'hui',
      month: 'mois',
      week: 'semaine',
      day: 'jour',
      agenda: 'Agenda',
      date: 'date',
      time: 'heure',
      event: 'événement', // Or anything you want
      showMore: total => `voir ${total} de +`
    }

    return (
      <div className='row'>
        <div className='col s12'>
        {this.state.mounted ? (
          <BigCalendar
            events={myEventsList}
            defaultView='month'
            views={['month']}
            selectable
            step={60}
            timeevents={1}
            localizer={localizer}
            startAccessor="date"
            endAccessor="date"
            culture='fr'
            messages={messages}
            onSelectEvent={event => alert(event.restaurant.name)}
            eventPropGetter={(this.eventStyleGetter)}
            components={{
              event: Event
            }}
         />
        ) : (
          ''
        )}
        </div>
      </div>
    )
  }
}

export default Calendar
