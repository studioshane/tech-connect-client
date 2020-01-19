import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class NewEventForm extends React.Component {
  state = {
      open: true,
      client: "",
      venue: "",
      start: "",
      end: "",
      techs_required: ""
  }

  componentDidMount = () => {
      if (!this.props.edit) {
          this.setState({
              start: this.formatDate(this.props.selectedDate) + "T07:00",
              end: this.formatDate(this.props.selectedDate) + "T19:00"
          });
      } else {
      }
  }

  handleClose = () => {
      this.props.closePopup();
  }

  handleSubmit = () => {
      this.props.createEvent(this.state);
      this.props.closePopup();
  }

  handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
  }

  formatDate = date =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date
          .getDate()
          .toString()
          .padStart(2, "0")}`

  render() {
      const { client, venue, start, end, techs_required } = this.state;
      return (
          <div>
              <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby='form-dialog-title'
              >
                  <DialogTitle id='form-dialog-title'>Create New Event</DialogTitle>
                  <DialogContent onChange={this.handleChange}>
                      <TextField
                          margin='dense'
                          label='Client'
                          value={client}
                          fullWidth
                          name='client'
                      />
                      <TextField
                          margin='dense'
                          value={venue}
                          label='Venue'
                          fullWidth
                          name='venue'
                      />
                      <TextField
                          margin='dense'
                          value={techs_required}
                          label='Technicians Required'
                          type='phone'
                          name='techs_required'
                      />
                      <br />
                      <TextField
                          margin='dense'
                          value={start}
                          label='Start Date'
                          type='datetime-local'
                          name='start'
                      />
                      <TextField
                          margin='dense'
                          label='End Date'
                          value={end}
                          type='datetime-local'
                          name='end'
                      />
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={this.handleClose} color='primary'>
              Cancel
                      </Button>
                      <Button onClick={this.handleSubmit} color='primary'>
              Add event to calendar
                      </Button>
                  </DialogActions>
              </Dialog>
          </div>
      );
  }
}
