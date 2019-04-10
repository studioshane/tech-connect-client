import React, { Component } from "react"
import API from "../Adaptors/API"
import TechnicianCard from "../Components/TechnicianCard"
import { TextField, Grid, Typography, Select } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import CircularProgress from "@material-ui/core/CircularProgress"
import Search from "@material-ui/icons/Search"

class AllTechniciansContainer extends Component {
  state = {
    allTechnicians: [],
    filterDisciplineOptions: [],
    searchField: "",
    loading: true
  }

  componentDidMount = () =>
    API.getAllTechnicians().then(allTechnicians =>
      this.setState({ allTechnicians, loading: false })
    )

  filteredTechnicians = () => {
    const { searchField, allTechnicians } = this.state
    if (searchField === "") return allTechnicians
    return allTechnicians.filter(tech =>
      tech.name.toLowerCase().includes(searchField.toLowerCase())
    )
  }

  handleChange = event => this.setState({ searchField: event.target.value })

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

        <Search autoWidth={true} multiple={true} />

        <TextField
          style={{ padding: 24 }}
          placeholder='search by name'
          value={this.state.searchField}
          onChange={this.handleChange}
        />

        <Select />

        <Grid container spacing={24} style={{ padding: 24 }}>
          {this.state.loading ? (
            <CircularProgress style={{ margin: "auto" }} align='center' />
          ) : (
            this.filteredTechnicians().map(currentTech => (
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
