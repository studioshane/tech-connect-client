import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

class DeleteEventDialog extends React.Component {
  handleClose = () => {
    this.props.closeDeleteDialog()
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {"Are you sure you want to delete this event?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              This action cannot be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              Cancel
            </Button>
            <Button onClick={this.props.deleteEvent} color='primary'>
              Delete Event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default DeleteEventDialog
