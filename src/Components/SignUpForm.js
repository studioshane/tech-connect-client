import React from "react"
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography
} from "@material-ui/core"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import RadioButtons from "./RadioButtons"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import styles from "../Config/config"

const disciplineOptions = [
  {
    value: "audio",
    label: "Audio"
  },
  {
    value: "video",
    label: "Video"
  },
  {
    value: "lighting",
    label: "Lighting"
  },
  {
    value: "general",
    label: "General"
  }
]

class SignUpForm extends React.Component {
  state = {
    value: "producer",
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    audio: false,
    video: false,
    lighting: false,
    general: false,
    day_rate: ""
  }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   if (this.state.value === "technician") {
  //     API.signUpTech(this.state)
  //   } else {
  //     API.signUpProd(this.state)
  //   }
  // }

  handleSelect = event => {
    this.setState({ value: event.target.value })
  }

  handleToggle = event => {
    this.setState({ [event.target.name]: !this.state[event.target.name] })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signUp(this.state)
  }

  render() {
    const { classes } = this.props
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar color='inherit' className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <RadioButtons
              value={this.state.value}
              handleSelect={this.handleSelect}
            />
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input
                onChange={this.handleChange}
                name='email'
                autoComplete='email'
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                onChange={this.handleChange}
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <Input
                  onChange={this.handleChange}
                  name='name'
                  autoComplete='name'
                />
              </FormControl>
              <FormControl margin='normal' required fullWidth>
                <InputLabel htmlFor='phone'>Phone</InputLabel>
                <Input
                  onChange={this.handleChange}
                  name='phone'
                  type='phone'
                  id='tel'
                />
              </FormControl>
              {this.state.value === "producer" ? (
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='company'>Company</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    name='company'
                    autoComplete='company'
                  />
                </FormControl>
              ) : (
                <FormControl margin='normal' required fullWidth>
                  <InputLabel htmlFor='day-rate'>Day Rate</InputLabel>
                  <Input
                    onChange={this.handleChange}
                    name='day_rate'
                    type='tel'
                  />
                </FormControl>
              )}
            </FormControl>
            {this.state.value === "technician" ? (
              <div>
                {disciplineOptions.map(checkboxOptions => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={this.handleToggle}
                        value={checkboxOptions.value}
                        color='primary'
                        name={checkboxOptions.value}
                      />
                    }
                    label={checkboxOptions.label}
                  />
                ))}
              </div>
            ) : null}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles.styles)(SignUpForm)
