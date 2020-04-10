import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DragAndDropZone from "./DragAndDropZone/DragAndDropZone";
import api from '../Services/api';

class DepartmentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: '',
      user: '',
      name: '',
      url: '',
      email: '',
      description: '',
      preview: '',
      coverPhoto: '',
      logo: '',
      thumbnail: ''
    };
  }

  componentDidMount() {
    const {type} = this.props;
    const {user} = this.context;
    this.setState({type: type, user: user});
    if (type === 'edit') {
      this.initFields();
    }
  }

  initFields() {
    const {department} = this.props;

    this.setState({
      name: department.name,
      email: department.email,
      description: department.description,
      url: department.url,
      phone: department.phone,
      preview: department.preview
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {name, email, url, description, phone, preview, coverPhoto, logo, thumbnail} = this.state;
    const {department} = this.props;

    await api.sponsors.update(department.id, {
      name,
      email,
      url,
      description,
      phone,
      preview
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleCreate = async () => {
    const {name, email, url, description, phone, preview, coverPhto, logo, thumbnail, user} = this.state;

    await api.sponsors.create({
      name,
      email,
      url,
      description,
      phone,
      preview,
      personnel: [user]
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  render() {
    const {open, type, name, email, url, description, phone, preview, coverPhoto, logo, thumbnail} = this.state;
    const {title} = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {title}
        </Button>
        <Dialog open={open} onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Change any field or upload new photos. Click Save all changes have been made
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Department Name"
                  value={name}
                  fullWidth
                  onChange={this.handleChange('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Organization URL"
                  value={url}
                  fullwidth
                  onChange={this.handleChange('url')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Department Phone Number"
                  value={phone}
                  onChange={this.handleChange('phone')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Department Email"
                  value={email}
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows='4'
                  fullWidth
                  label='Department Description'
                  value={description}
                  onChange={this.handleChange('description')}
                />
                <TextField
                  multiline
                  rows='2'
                  fullWidth
                  label='Preview'
                  value={preview}
                  onChange={this.handleChange('preview')}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <Grid container  justify='center' spacing={2} alignItems='center'>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <DragAndDropZone/>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={10}>
                <Card>
                  <CardContent>
                    <DragAndDropZone/>
                  </CardContent>
                </Card>

              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {type === 'edit' &&
            < Button onClick={this.handleSave} color="primary">
              Save
            </Button>
            }
            {type === 'create' &&
            < Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
)(DepartmentForm);
