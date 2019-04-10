import React from "react"
import BigCalendar from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography } from "@material-ui/core"
import API from "../Adaptors/API"

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends React.Component {
  state = {
    techEvents: []
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      API.getTechnicianEvents(this.props.match.params.id).then(events =>
        this.setState({ techEvents: this.changeName(events) })
      )
    }
  }

  showEvents = () => {
    if (!this.props.match.params.id) return this.props.currentUser.events
    return this.state.techEvents
  }

  changeName = events =>
    events.map(event => Object.assign({}, event, { title: "Unavailable" }))

  render() {
    const { currentUser } = this.props
    return (
      <div style={{ padding: 24, height: "500px" }}>
        {currentUser ? (
          <BigCalendar
            events={this.showEvents()}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            localizer={localizer}
          />
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
