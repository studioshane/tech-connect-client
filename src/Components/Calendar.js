import React, { Fragment } from "react"
import BigCalendar from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography } from "@material-ui/core"
import API from "../Adaptors/API"
import NewEventForm from "./NewEventForm"
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends React.Component {
  state = {
    techEvents: [],
    eventPopup: false,
    selectedDate: ""
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      API.getTechnicianEvents(this.props.match.params.id).then(events =>
        this.setState({ techEvents: this.changeTitleToUnavailable(events) })
      )
    } else if (
      this.props.currentUser &&
      !this.props.currentUser.is_technician
    ) {
      API.getProducerEvents(this.props.currentUser.id).then(events =>
        this.setState({ techEvents: this.changeTitleToClient(events) })
      )
    } else if (this.props.currentUser && this.props.currentUser.is_technician) {
      API.getTechnicianEvents(this.props.currentUser.id).then(techEvents =>
        this.setState({ techEvents })
      )
    }
  }

  // showEvents = () => {
  //   if (!this.props.match.params.id) return this.props.currentUser.events
  //   return this.state.techEvents
  // }

  //used when a producer is looking at a tech's events
  changeTitleToUnavailable = events =>
    events.map(event => Object.assign({}, event, { title: "Unavailable" }))

  //used when a producer is looking at their own events
  changeTitleToClient = events =>
    events.map(event => Object.assign({}, event, { title: event.client }))

  handleSelect = ({ start, end }) => {
    this.setState({ eventPopup: true, selectedDate: start })
  }

  closePopup = () => {
    this.setState({ eventPopup: false })
  }

  createEvent = event => {
    API.createEvent({ ...event, ...this.props.currentUser }).then(event =>
      this.setState({
        techEvents: [
          ...this.state.techEvents,
          this.changeTitleToClient([event])
        ].flat()
      })
    )
  }

  render() {
    const { currentUser } = this.props
    return (
      <div style={{ padding: 24, height: "500px" }}>
        {currentUser ? (
          <Fragment>
            <BigCalendar
              popup
              selectable={!this.props.match.params.id ? true : false}
              events={this.state.techEvents}
              // views={allViews}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              localizer={localizer}
              onDoubleClickEvent={this.doubleClick}
              onSelectEvent={event => console.log(event)}
              onSelectSlot={this.handleSelect}
            />

            {this.state.eventPopup && (
              <NewEventForm
                selectedDate={this.state.selectedDate}
                closePopup={this.closePopup}
                createEvent={this.createEvent}
              />
            )}
          </Fragment>
        ) : (
          <Typography align='center'>
            You must be logged in to view this
          </Typography>
        )}
      </div>
    )
  }
}

export default Calendar
