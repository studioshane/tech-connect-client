import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import styles from "../Config/config";

class LoginForm extends React.Component {
  state = {
      email: "",
      password: ""
  }

  handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
      event.preventDefault();
      this.props.login(this.state);
  }

  render() {
      const { classes } = this.props;
      return (
          <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                  <Avatar color='primary' className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
            Log in
                  </Typography>
                  <form onSubmit={this.handleSubmit} className={classes.form}>
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
                      </FormControl>
                      <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          className={classes.submit}
                      >
              Login
                      </Button>
                  </form>
              </Paper>
          </main>
      );
  }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles.styles)(LoginForm);
