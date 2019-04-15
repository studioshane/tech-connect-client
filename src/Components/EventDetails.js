import React, { Component, Fragment } from "react"
import { Typography } from "@material-ui/core"
import API from "../Adaptors/API"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { formatDate } from "../lib/helper"
import { Link } from "react-router-dom"

class EventDetails extends Component {
  state = {
    event: {}
  }

  componentDidMount = () => {
    API.getEventById(this.props.match.params.id).then(resp =>
      this.setState({ event: resp })
    )
  }

  render() {
    const { event } = this.state
    return (
      <div>
        <Card
          style={{
            minWidth: "500px",
            maxWidth: "800px",
            minHeight: 500,
            margin: "auto",
            marginTop: "50px"
          }}
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
              {event.start} - {event.end}
            </Typography>
          </CardContent>
          <CardActions>
            {
              <Button
                component={Link}
                to={`/events/${event.id}/addtechnician`}
                size='small'
              >
                Find Technicians for Event
              </Button>
            }
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default EventDetails
