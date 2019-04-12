import React, { Component } from "react"
import API from "../Adaptors/API"
import EventCard from "../Components/EventCard"
import DeleteEventDialog from "../Components/DeleteEventDialog"
import { Typography, Grid } from "@material-ui/core"

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
        <Grid container spacing={24} style={{ padding: 24 }}>
          {currentUser ? (
            events.map(eventDetails => (
              <Grid item xs={6} sm={4} lg={3}>
                <EventCard
                  isTech={currentUser.is_technician}
                  showDeleteDialog={this.showDeleteDialog}
                  key={eventDetails.id}
                  event={eventDetails}
                />
              </Grid>
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
        </Grid>
      </>
    )
  }
}

export default MyAccountContainer
