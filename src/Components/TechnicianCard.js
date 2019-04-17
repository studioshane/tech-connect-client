import React from "react"
import { Card, Button, CardContent, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import mic from "../images/mic.png"
import proj from "../images/projector.png"
import lights from "../images/lights.png"
import tool from "../images/tool.png"
import { techIcon, techIcons } from "../Styles/styles"

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
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Card
        raised={true}
        style={{ minWidth: "300px", maxWidth: "300px", minHeight: "280px" }}
      >
        <CardContent>
          <Typography
            align='center'
            noWrap={false}
            variant='headline'
            component='h2'
            gutterBottom={true}
          >
            {name}
          </Typography>
          <hr style={{ borderTop: "0px grey" }} />
          <Typography align='center'>Tel: {phone}</Typography>
          <Typography align='center'>email: {email}</Typography>
          <Typography align='center'>£{day_rate}</Typography>
          <span style={techIcons}>
            {audio && <img style={techIcon} src={mic} alt={"audio"} />}
            {video && <img style={techIcon} src={proj} alt={"video"} />}
            {lighting && (
              <img style={techIcon} src={lights} alt={"lightning"} />
            )}
            {general && <img style={techIcon} src={tool} alt={"general"} />}
          </span>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5px",
            marginTop: "10px",
            marginLeft: "10px"
          }}
        >
          {props.addTechnician ? (
            <Button
              onClick={() => props.bookTechnician(id)}
              variant='contained'
              color='secondary'
              align='center'
            >
              Book Technician
            </Button>
          ) : (
            <Button
              component={Link}
              to={`/technicians/${id}/calendar`}
              variant='contained'
              color='secondary'
            >
              See Availability
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default TechnicianCard
