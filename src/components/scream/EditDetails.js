import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//MUI stuff
import {
  Button,
  withStyles,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
} from "@material-ui/core";

//icons
import EditIcon from "@material-ui/icons/Edit";

//Redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  typography: theme.typography,
  form: theme.form,
  image: theme.image,
  pageTitle: theme.pageTitle,
  textField: theme.textField,
  button: {
    float: "right",
  },
  customError: theme.customError,
  progress: theme.progress,
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOpen = () => {
    console.log("opened");
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where are you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
