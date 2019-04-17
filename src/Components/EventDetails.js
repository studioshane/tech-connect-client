import React, { Component, Fragment } from "react"
import { Typography } from "@material-ui/core"
import API from "../Adaptors/API"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import NewEventForm from "./NewEventForm"
import { formatDate } from "../lib/helper"
import { Link } from "react-router-dom"
import { eventDetails, eventDetailsWrapper, details } from "../Styles/styles"

class EventDetails extends Component {
  state = {
    event: {},
    loaded: false,
    editEvent: false
  }

  componentDidMount = () => {
    API.getEventById(this.props.match.params.id)
      .then(resp => this.setState({ event: resp, loaded: true }))
      .then(console.log(this.state.event))
  }

  updateEvent = () => {}

  render() {
    const { event, loaded } = this.state
    const { currentUser } = this.props
    return (
      <Fragment>
        <Typography style={eventDetails.heading} align='center' variant='h4'>
          {event.client}
        </Typography>
        <div style={eventDetailsWrapper}>
          {loaded && (
            <span>
              <Card
                style={eventDetails.techCard}
                // className={this.props.classes.card}
              >
                <CardContent>
                  <Typography align='center' noWrap variant='h6' component='h2'>
                    Confirmed Technicians
                  </Typography>
                  <hr />
                  {event.technicians.map(tech => (
                    <Card key={tech.id} style={eventDetails.nameCard}>
                      <Typography align='center' style={eventDetails.techList}>
                        {tech.name}
                      </Typography>
                      <div style={eventDetails.techList}>
                        {tech.audio && (
                          <Typography
                            style={eventDetails.discipline}
                            color='textSecondary'
                          >
                            Audio
                          </Typography>
                        )}
                        {tech.video && (
                          <Typography
                            style={eventDetails.discipline}
                            color='textSecondary'
                          >
                            Video
                          </Typography>
                        )}
                        {tech.lighting && (
                          <Typography
                            style={eventDetails.discipline}
                            color='textSecondary'
                          >
                            Lighting
                          </Typography>
                        )}
                        {tech.general && (
                          <Typography
                            style={eventDetails.discipline}
                            color='textSecondary'
                          >
                            General
                          </Typography>
                        )}
                      </div>
                    </Card>
                  ))}
                </CardContent>
                <CardActions>
                  {currentUser.is_technician ||
                  event.technicians.length !== event.techs_required ? (
                    <Button
                      color='secondary'
                      component={Link}
                      to={`/events/${event.id}/addtechnician`}
                      size='small'
                    >
                      Find Technicians for Event
                    </Button>
                  ) : (
                    <Typography>Event Fully Crewed</Typography>
                  )}
                </CardActions>
              </Card>
            </span>
          )}
          {loaded && (
            <span>
              <Card
                style={eventDetails.eventCard}
                // className={this.props.classes.card}
              >
                <CardContent>
                  <Typography align='center' noWrap variant='h6' component='h2'>
                    Event Details
                  </Typography>
                  <hr />
                  <div style={eventDetails.discipline}>
                    <Typography noWrap variant='body1'>
                      <b>Venue: </b> {event.venue}
                    </Typography>
                    <Typography>
                      <b>Start Date: </b> {formatDate(event.start).slice(0, 10)}
                    </Typography>
                    <Typography>
                      <b>Load In: </b> {formatDate(event.start).slice(13)}
                    </Typography>
                    <Typography>
                      <b>End Date: </b> {formatDate(event.end).slice(0, 10)}
                    </Typography>
                    <Typography>
                      <b>Derig Starts: </b> {formatDate(event.end).slice(13)}
                    </Typography>
                    <Button
                      color='secondary'
                      onClick={this.updateEvent}
                      size='small'
                    >
                      Edit Event
                    </Button>
                  </div>
                </CardContent>
                <CardActions />
              </Card>
            </span>
          )}
        </div>
        {this.state.editEvent && (
          <NewEventForm
            event={this.state.event}
            closePopup={this.closePopup}
            editEvent={this.editEvent}
            editEvent
          />
        )}
      </Fragment>
    )
  }
}

export default EventDetails
