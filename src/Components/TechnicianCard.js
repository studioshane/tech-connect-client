import React from "react"
import { Card, Button, CardContent, Typography } from "@material-ui/core"
import { Theaters, Highlight, InsertEmoticon } from "@material-ui/icons"
import { Link } from "react-router-dom"

const TechnicianCard = props => {
  const {
    id,
    name,
    phone,
    day_rate,
    email,
    audio,
    video,
    general,
    lighting
  } = props.tech
  return (
    <div>
      <Card
        raised={true}
        style={{ minWidth: "230px", maxWidth: "300px", minHeight: "280px" }}
      >
        <CardContent>
          <Typography
            align='center'
            noWrap={false}
            gutterBottom
            variant='headline'
            component='h2'
            gutterBottom={true}
          >
            {name}
          </Typography>
          <Typography align='center'>Tel: {phone}</Typography>
          <Typography align='center'>email: {email}</Typography>
          <Typography align='center'>£{day_rate}</Typography>
          <ul>
            {audio ? "🎤" : null}
            {video ? <Theaters /> : null}
            {lighting ? <Highlight /> : null}
            {general ? <InsertEmoticon /> : null}
          </ul>
        </CardContent>

        <Button
          component={Link}
          to={`/technicians/${id}/calendar`}
          variant='contained'
          color='secondary'
          align='center'
        >
          See Availability
        </Button>
      </Card>
    </div>
  )
}

export default TechnicianCard
