import React, { Component, Fragment } from "react"
import { Switch, Route, withRouter } from "react-router-dom"
import "./App.css"
import SignUpForm from "./Components/SignUpForm"
import MyAccountContainer from "./Containers/MyAccountContainer"
import TechniciansContainer from "./Containers/AllTechniciansContainer"
import Navbar from "./Components/Navbar"
import LoginForm from "./Components/LoginForm"
import API from "./Adaptors/API"
import Calendar from "./Components/Calendar"
import EventDetails from "./Components/EventDetails"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import { createMuiTheme } from "@material-ui/core/styles"

let imgUrl = "./images/background.jpg"
let styles = {
  root: {
    backgroundImage: `url(${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
}

class App extends Component {
  state = {
    currentUser: window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : undefined
  }

  logout = () => {
    this.setState({ currentUser: undefined })
    window.localStorage.removeItem("user")
  }

  handleUserResponse = user => {
    if (user.hasOwnProperty("error")) {
      alert("Uh-oh, something went wrong")
    } else {
      this.setState({ currentUser: user })
      window.localStorage.setItem("user", JSON.stringify(user))
      this.props.history.push("/myaccount")
    }
  }

  signUp = userObj => {
    if (userObj.value === "technician") {
      API.signUpTech(userObj).then(this.handleUserResponse)
    } else {
      API.signUpProd(userObj).then(this.handleUserResponse)
    }
  }

  login = userObj => {
    API.login(userObj).then(this.handleUserResponse)
  }

  render() {
    return (
      <Fragment>
        <Navbar logout={this.logout} user={this.state.currentUser} />
        <MuiThemeProvider style={styles}>
          <Switch>
            <Route
              exact
              path='/signup'
              component={routerProps => {
                return (
                  <SignUpForm
                    signUp={this.signUp}
                    {...routerProps}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
            <Route
              exact
              path='/login'
              component={routerProps => {
                return (
                  <LoginForm
                    {...routerProps}
                    login={this.login}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
            <Route
              exact
              path='/myaccount'
              component={routerProps => {
                return (
                  <MyAccountContainer
                    currentUser={this.state.currentUser}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path='/technicians'
              component={routerProps => {
                return (
                  <TechniciansContainer
                    currentUser={this.state.currentUser}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path='/events/:id/addtechnician'
              component={routerProps => {
                return (
                  <TechniciansContainer
                    currentUser={this.state.currentUser}
                    {...routerProps}
                    addTechnician
                  />
                )
              }}
            />
            <Route
              path='/mycalendar'
              component={routerProps => {
                return (
                  <Calendar
                    currentUser={this.state.currentUser}
                    {...routerProps}
                  />
                )
              }}
            />
            <Route
              exact
              path='/technicians/:id/calendar'
              component={routerProps => {
                return (
                  <Calendar
                    {...routerProps}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
            <Route
              exact
              path='/events/:id/'
              component={routerProps => {
                return (
                  <EventDetails
                    {...routerProps}
                    currentUser={this.state.currentUser}
                  />
                )
              }}
            />
          </Switch>
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

export default withRouter(App)
