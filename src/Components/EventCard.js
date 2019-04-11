import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { formatDate } from "../lib/helper"
import DeleteEventDialog from "../Components/DeleteEventDialog"

const styles = {
  card: {
    minWidth: 275
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
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {event.client}
          </Typography>
          <Typography variant='h5' component='h2'>
            {event.venue}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {formatDate(event.start)} - {formatDate(event.end)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>More Details</Button>
          <Button onClick={() => props.showDeleteDialog(event.id)} size='small'>
            Delete Event
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard)
