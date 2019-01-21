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
    const localizer = BigCalendar.momentLocalizer(moment);
    let myEventsList;

    if (this.state.eventsList[0] != undefined) {
      myEventsList = this.state.eventsList[0].events
    } else {
      myEventsList = this.state.eventsList
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
            messages={{'today': "Aujourd'hui", "previous":'Précédent', "next":"Suivant"}}
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
