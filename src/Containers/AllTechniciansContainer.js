import React, { Component } from "react"
import API from "../Adaptors/API"
import TechnicianCard from "../Components/TechnicianCard"
import {
  TextField,
  Grid,
  Typography,
  InputLabel,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Search from "@material-ui/icons/Search"
import { disciplines } from "../lib/helper"
import PopupState, {
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/index"

class AllTechniciansContainer extends Component {
  state = {
    allTechnicians: [],
    searchField: "",
    loading: true,
    disciplineFilters: []
  }

  componentDidMount = () => {
    if (!this.props.match.params.id) {
      API.getAllTechnicians().then(allTechnicians =>
        this.setState({ allTechnicians, loading: false })
      )
    } else {
      API.getAvailableTechnicians(this.props.match.params.id).then(
        availableTechnicians =>
          this.setState({
            allTechnicians: availableTechnicians,
            loading: false
          })
      )
    }
  }

  searchByName = () => {
    const { searchField, allTechnicians } = this.state
    if (searchField === "") return allTechnicians
    return allTechnicians.filter(tech =>
      tech.name.toLowerCase().includes(searchField.toLowerCase())
    )
  }

  handleChange = event => this.setState({ searchField: event.target.value })

  handleFilter = event => {
    if (!this.state.disciplineFilters.includes(event.target.value)) {
      this.setState({
        disciplineFilters: [
          ...this.state.disciplineFilters,
          event.target.value
        ].flat()
      })
    } else {
      this.setState({
        disciplineFilters: this.state.disciplineFilters.filter(
          discipline => discipline !== event.target.value
        )
      })
    }
  }

  bookTechnician = technicianId => {
    const eventId = this.props.match.params.id
    API.addTechToEvent(eventId, technicianId).then(
      this.props.history.push(`/events/${eventId}`)
    )
  }

  // handleChange = event => {
  //   this.setState({ disciplineFilters: event.target.value })
  // }

  render() {
    return (
      <>
        <Typography
          style={{ padding: 20 }}
          variant='h4'
          color='inherit'
          align='center'
        >
          {this.props.match.params.id
            ? "Available Technicians"
            : "All Technicians"}
        </Typography>

        <TextField
          style={{ padding: 24 }}
          placeholder='search by name'
          value={this.state.searchField}
          onChange={this.handleChange}
        >
          <Search />
        </TextField>

        <PopupState variant='popover' popupId='demo-popup-menu'>
          {popupState => (
            <React.Fragment>
              <Button variant='contained' {...bindTrigger(popupState)}>
                Open Menu
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Cake</MenuItem>
                <MenuItem onClick={popupState.close}>Death</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>

        <Grid container spacing={24} style={{ padding: 24 }}>
          {this.state.loading ? (
            <CircularProgress style={{ margin: "auto" }} align='center' />
          ) : (
            this.searchByName().map(currentTech => (
              <Grid key={currentTech.id} item xs={6} sm={4} lg={3}>
                <TechnicianCard
                  bookTechnician={this.bookTechnician}
                  addTechnician={this.props.addTechnician}
                  key={currentTech.id}
                  tech={currentTech}
                />
              </Grid>
            ))
          )}
        </Grid>
      </>
    )
  }
}

export default AllTechniciansContainer
