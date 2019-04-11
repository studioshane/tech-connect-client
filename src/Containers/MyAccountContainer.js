import React, { Component } from "react"
import API from "../Adaptors/API"
import EventCard from "../Components/EventCard"
import DeleteEventDialog from "../Components/DeleteEventDialog"
import { Typography } from "@material-ui/core"

class MyAccountContainer extends Component {
  state = {
    events: [],
    deleteDialog: false,
    selectedEventId: undefined
  }

  componentDidMount = () => {
    const { currentUser } = this.props
    if (currentUser && currentUser.is_technician) {
      API.getTechnicianEvents(currentUser.id).then(techEvents =>
        this.setState({ events: techEvents })
      )
    } else if (currentUser) {
      API.getProducerEvents(currentUser.id).then(prodEvents =>
        this.setState({ events: prodEvents })
      )
    }
  }

  showDeleteDialog = eventId => {
    this.setState({ deleteDialog: true, selectedEventId: eventId })
  }

  closeDeleteDialog = () => {
    this.setState({ deleteDialog: false })
  }

  deleteEvent = () =>
    API.deleteEvent(this.state.selectedEventId).then(resp =>
      this.setState({
        deleteDialog: false,
        events: this.state.events.filter(event => event.id !== resp.id)
      })
    )

  render() {
    const { events } = this.state
    const { currentUser } = this.props
    return (
      <>
        {currentUser ? (
          events.map(eventDetails => (
            <EventCard
              isTech={currentUser.is_technician}
              showDeleteDialog={this.showDeleteDialog}
              key={eventDetails.id}
              event={eventDetails}
            />
          ))
        ) : (
          <Typography align='center'>
            You must be logged in to view this
          </Typography>
        )}
        {this.state.deleteDialog && (
          <DeleteEventDialog
            open={this.state.deleteDialog}
            closeDeleteDialog={this.closeDeleteDialog}
            deleteEvent={this.deleteEvent}
          />
        )}
      </>
    )
  }
}

export default MyAccountContainer
