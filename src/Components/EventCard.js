import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { formatDate } from "../lib/helper"
import { Link } from "react-router-dom"

const styles = {
  card: {
    minWidth: 500
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function EventCard(props) {
  const { classes, event } = props
  // const bull = <span className={classes.bullet}>•</span>

  return (
    <div>
      <Card
        raised
        style={{ minWidth: "280px", maxWidth: "300px", minHeight: 200 }}
        className={classes.card}
      >
        <CardContent>
          <Typography
            noWrap
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {props.isTech ? event.title : event.client}
          </Typography>
          <Typography noWrap variant='h5' component='h2'>
            {event.venue}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {formatDate(event.start)} - {formatDate(event.end)}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Technicians {event.technicians.length}/{event.techs_required}
          </Typography>
        </CardContent>
        <CardActions>
          <span>
            <Button component={Link} to={`/events/${event.id}`} size='small'>
              More Details
            </Button>
            <Button
              onClick={() => props.showDeleteDialog(event.id)}
              size='small'
            >
              {props.isTech ? "Cancel Event" : "Delete Event"}
            </Button>
          </span>
        </CardActions>
      </Card>
    </div>
  )
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard)
