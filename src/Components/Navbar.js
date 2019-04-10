import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import {
  withStyles,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import MenuIcon from "@material-ui/icons/Menu"
import styles from "../Config/config"
import { firstName } from "../lib/helper"

class Navbar extends Component {
  state = {}
  render() {
    const { classes, user, logout } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              to='/myaccount'
              variant='h6'
              color='inherit'
              className={classes.grow}
            >
              {user ? "My Account" : ""}
            </Typography>
            {user ? (
              <Button component={Link} to='/mycalendar' color='inherit'>
                My Calendar
              </Button>
            ) : null}
            {
              <Button component={Link} to='/technicians' color='inherit'>
                Find Technicians
              </Button>
            }
            {user ? (
              <Button
                component={Link}
                to='/login'
                onClick={logout}
                color='inherit'
              >
                Log Out {firstName(user.name)}
              </Button>
            ) : (
              <div>
                <Button component={Link} to='/login' color='inherit'>
                  Login
                </Button>
                <Button component={Link} to='/signup' color='inherit'>
                  Sign Up
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles.style)(Navbar)
