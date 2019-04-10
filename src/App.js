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

class App extends Component {
  state = {
    currentUser: undefined
  }

  logout = () => {
    this.setState({ currentUser: undefined })
  }

  signUp = userObj => {
    if (userObj.value === "technician") {
      API.signUpTech(userObj).then(user => {
        if (user.hasOwnProperty("error")) {
          alert("Uh-oh, something went wrong")
        } else {
          this.setState({ currentUser: user })
          this.props.history.push("/myaccount")
        }
      })
    } else {
      API.signUpProd(userObj).then(user => {
        if (user.hasOwnProperty("error")) {
          alert("Uh-oh, something went wrong")
        } else {
          this.setState({ currentUser: user })
          this.props.history.push("/myaccount")
        }
      })
    }
  }

  login = userObj => {
    API.login(userObj).then(user => {
      if (user.hasOwnProperty("error")) {
        alert("Uh-oh, something went wrong")
      } else {
        this.setState({ currentUser: user })
        this.props.history.push("/myaccount")
      }
    })
  }

  // login = userObj => {
  //   API.login(userObj)
  //     .then(currentUser => {
  //       this.setState({ currentUser })
  //       this.props.history.push("/myaccount")
  //     })
  //     .catch(alert("Uh oh, somthing went wrong "))
  // }

  render() {
    return (
      <Fragment>
        <Navbar logout={this.logout} user={this.state.currentUser} />

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
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
