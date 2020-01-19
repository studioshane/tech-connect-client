/* eslint-disable indent */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles, Toolbar, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import styles from "../Config/config";
import { firstName } from "../lib/helper";
import "../App.css";
import { navbutton } from "../Styles/styles";

class Navbar extends Component {
  state = {}
  render() {
    const { classes, user, logout } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <div style={{ display: "inline-flex", width: "60%" }}>
              <Button
                style={navbutton}
                className='navbutton'
                component={Link}
                to='/myaccount'
                color='inherit'
                // className={classes.grow}
              >
                My Events
              </Button>
              {user ? (
                <Button
                  style={navbutton.avatar}
                  className='navbutton'
                  component={Link}
                  to='/mycalendar'
                  color='inherit'
                >
                  My Calendar
                </Button>
              ) : null}
              {user ? (
                <Button
                  style={navbutton.avatar}
                  className='navbutton'
                  component={Link}
                  to='/technicians'
                  color='inherit'
                >
                  Find Technicians
                </Button>
              ) : null}
            </div>
            <div style={{ position: "absolute", right: "40px" }}>
              {user ? (
                <Button
                  style={{ leftMargin: "10px" }}
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
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles.style)(Navbar);
