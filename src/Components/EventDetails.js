import React, { Component, Fragment } from "react"
import { Typography } from "@material-ui/core"
import API from "../Adaptors/API"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { formatDate } from "../lib/helper"
import { Link } from "react-router-dom"
import { eventDetails } from "../Styles/styles"

class EventDetails extends Component {
  state = {
    event: {},
    loaded: false
  }

  componentDidMount = () => {
    API.getEventById(this.props.match.params.id).then(resp =>
      this.setState({ event: resp, loaded: true })
    )
  }

  render() {
    const { event, loaded } = this.state
    const { currentUser } = this.props
    return (
      <Fragment>
        <Typography style={eventDetails.heading} align='center' variant='h4'>
          {event.client}
        </Typography>
        {loaded && (
          <div>
            <Card
              style={eventDetails.techCard}
              // className={this.props.classes.card}
            >
              <CardContent>
                <Typography align='center' noWrap variant='h6' component='h2'>
                  Confirmed Technicians
                </Typography>
                {event.technicians.map(tech => (
                  <Card style={eventDetails.nameCard}>
                    <Typography align='center' style={eventDetails.techList}>
                      {tech.name}
                    </Typography>
                    <div style={eventDetails.techList}>
                      {tech.audio && (
                        <Typography
                          style={eventDetails.discipline}
                          color='textSecondary'
                        >
                          Audio{" "}
                        </Typography>
                      )}
                      {tech.video && (
                        <Typography
                          style={eventDetails.discipline}
                          color='textSecondary'
                        >
                          Video{" "}
                        </Typography>
                      )}
                      {tech.lighting && (
                        <Typography
                          style={eventDetails.discipline}
                          color='textSecondary'
                        >
                          Lighting{" "}
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
                    component={Link}
                    to={`/events/${event.id}/addtechnician`}
                    size='small'
                  >
                    Find Technicians for Event
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        )}
        {loaded && (
          <div>
            <Card
              style={eventDetails.eventCard}
              // className={this.props.classes.card}
            >
              <CardContent>
                <Typography
                  noWrap
                  // className={this.props.classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  {event.client}
                </Typography>
                <Typography noWrap variant='h5' component='h2'>
                  {event.venue}
                </Typography>
                <Typography
                  // className={this.props.classes.pos}
                  color='textSecondary'
                >
                  {formatDate(event.start)} - {formatDate(event.end)}
                </Typography>
              </CardContent>
              <CardActions />
            </Card>
          </div>
        )}
      </Fragment>
    )
  }
}

export default EventDetails
