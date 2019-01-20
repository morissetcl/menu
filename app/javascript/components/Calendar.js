import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class Calendar extends Component {

  constructor(props) {
    super(props);
  }


  render(){
    const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

    const myEventsList= [
                          {
                            'title': 'Event 1',
                            'startDate': new Date(),
                            'endDate': new Date()
                          }
                        ]

    console.log(myEventsList)
    return (
      <div className='row'>
        <div className='col s12'>
         <BigCalendar
           events={myEventsList}
           defaultView='month'
           views={['month']}
           selectable
           step={60}
           timeevents={1}
           localizer={localizer}
           startAccessor="startDate"
           endAccessor="endDate"
        />
        </div>
      </div>
    )
  }
}

export default Calendar
