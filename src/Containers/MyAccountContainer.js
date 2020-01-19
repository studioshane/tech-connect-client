import React, { Component } from "react"
import API from "../Adaptors/API"
import EventCard from "../Components/EventCard"
import DeleteEventDialog from "../Components/DeleteEventDialog"
import { Typography, Grid, Fab } from "@material-ui/core"
import { sortDatesLowToHigh, sortDatesHighToLow } from "../lib/helper"

class MyAccountContainer extends Component {
  state = {
    events: [],
    deleteDialog: false,
    selectedEventId: undefined,
    upcomingEvents: true
  }

  componentDidMount = () => {
    const { currentUser } = this.props
    if (currentUser && currentUser.is_technician) {
      API.getTechnicianEvents(currentUser.id).then(techEvents =>
        this.setState({ events: techEvents })
      )
    } else if (currentUser) {
      API.getProducerEvents(currentUser.id)
        .then(prodEvents => this.setState({ events: prodEvents }))
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

  removeTechFromEvent = () => {
    API.removeTechFromEvent(
      this.state.selectedEventId,
      this.props.currentUser.id
    ).then(removedEvent =>
      this.setState({
        deleteDialog: false,
        events: this.state.events.filter(event => event.id !== removedEvent.id)
      })
    )
  }

  sortedEvents = events => {
    if (this.state.upcomingEvents) {
      return events
        .filter(event => new Date(event.end) > new Date())
        .sort(sortDatesLowToHigh)
    } else {
      return events
        .filter(event => new Date(event.start) < new Date())
        .sort(sortDatesHighToLow)
    }
  }

  handleToggle = () => {
    this.setState({ upcomingEvents: !this.state.upcomingEvents })
  }

  render() {
    const { events } = this.state
    const { currentUser } = this.props
    return (
      <>
        <Typography style={{ marginTop: 20 }} variant='h4' align='center'>
          My Events
        </Typography>
        <div
          style={{
            padding: 8,
            position: "absolute",
            right: "50px"
          }}
        >
          <Fab variant='extended' size='small' onClick={this.handleToggle}>
            {this.state.upcomingEvents
              ? "Show Previous Events"
              : "Show Upcoming Events"}
          </Fab>
        </div>
        <Grid
          container
          spacing={24}
          style={{ marginTop: "60px", padding: 24, minWidth: 600 }}
        >
          {currentUser ? (
            this.sortedEvents(events).map(eventDetails => (
              <Grid key={eventDetails.id} item s={6} m={4} lg={3}>
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
              isTech={this.props.currentUser.is_technician}
              open={this.state.deleteDialog}
              closeDeleteDialog={this.closeDeleteDialog}
              deleteEvent={this.deleteEvent}
              removeTechFromEvent={this.removeTechFromEvent}
            />
          )}
        </Grid>
      </>
    )
  }
}

export default MyAccountContainer
