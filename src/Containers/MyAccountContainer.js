import React, { Component, Fragment, Container } from "react"
import { firstName } from "../lib/helper"
import API from "../Adaptors/API"
import EventCard from "../Components/EventCard"

class MyAccountContainer extends Component {
  state = {
    events: []
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

  render() {
    const { events } = this.state
    const { currentUser } = this.props
    return (
      <>
        {currentUser ? (
          events.map(eventDetails => (
            <EventCard key={eventDetails.id} event={eventDetails} />
          ))
        ) : (
          <h1>You must be logged in to View This</h1>
        )}
      </>
    )
  }
}

export default MyAccountContainer
