import React, { Component } from "react"
import API from "../Adaptors/API"
import TechnicianCard from "../Components/TechnicianCard"
import { TextField, Grid, Typography, InputLabel } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Search from "@material-ui/icons/Search"
import { disciplines } from "../lib/helper"

class AllTechniciansContainer extends Component {
  state = {
    allTechnicians: [],
    searchField: "",
    loading: true,
    disciplineFilters: []
  }

  componentDidMount = () =>
    API.getAllTechnicians().then(allTechnicians =>
      this.setState({ allTechnicians, loading: false })
    )

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

  handleChange = event => {
    this.setState({ disciplineFilters: event.target.value })
  }

  render() {
    return (
      <>
        <Typography
          style={{ padding: 20 }}
          variant='h4'
          color='inherit'
          align='center'
        >
          All Technicians
        </Typography>

        <Search />

        <TextField
          style={{ padding: 24 }}
          placeholder='search by name'
          value={this.state.searchField}
          onChange={this.handleChange}
        />
        <InputLabel htmlFor='select-multiple-checkbox'>
          Filter by Discipline
        </InputLabel>
        {/* <Select
          onChange={this.handleFilter}
          multiple
          value={this.state.disciplineFilters}
          renderValue={selected => {
            if (selected.length === 0) {
              return <em>Filter by discipline</em>
            }

            return selected.join(", ")
          }}
          input={<Input id='select-multiple-checkbox' />}
          placeholder='filter technicians'
        >
          {disciplines.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={this.state.disciplineFilters.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select> */}

        <Grid container spacing={24} style={{ padding: 24 }}>
          {this.state.loading ? (
            <CircularProgress style={{ margin: "auto" }} align='center' />
          ) : (
            this.searchByName().map(currentTech => (
              <Grid item xs={6} sm={4} lg={3}>
                <TechnicianCard key={currentTech.id} tech={currentTech} />
              </Grid>
            ))
          )}
        </Grid>
      </>
    )
  }
}

export default AllTechniciansContainer
