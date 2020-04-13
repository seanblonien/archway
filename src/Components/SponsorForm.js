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
import Typography from "@material-ui/core/Typography";
import DragAndDropZone from "./DragAndDropZone/DragAndDropZone";
import api from '../Services/api';
import MarkdownEditor from "./Markdown/MarkdownEditor";
import {formatEntryUpload} from "../utils/utils";
import {snack} from "../utils/Snackbar";

class SponsorForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      type: '',
      user: '',
      name: '',
      url: '',
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
    const {sponsor} = this.props;

    this.setState({
      name: sponsor.name,
      description: sponsor.description,
      url: sponsor.url,
      preview: sponsor.preview
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = async () => {
    const {name, url, description, preview, coverPhto, logo, thumbnail} = this.state;
    const {sponsor} = this.props;

    await api.sponsors.update(sponsor.id, {
      name,
      url,
      description,
      preview
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleCreate = async () => {
    const {name, url, description, preview, coverPhto, logo, thumbnail, user} = this.state;

    await api.sponsors.create({
      name,
      url,
      description,
      preview,
      personnel: [user]
    });

    this.setState({open: false});
    window.location.reload();
  };

  handleChange = name => event => {
    debugger;
    this.setState({[name]: event.target.value});
  };

  handleMarkdownChange = (name, value) => {
  debugger;
    this.setState({[name]: value});
  };

  handleSelectImage = name => event => {
    this.setState({[name]: event.target.files[0]});
  };

  handleUploadImage = async () => {
    const {logo} = this.state;
  }

  render() {
    const {open, type, name, url, description, preview, coverPhto, logo, thumbnail} = this.state;
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
              <Grid item xs={5}>
                <TextField
                  label="Organization Name"
                  value={name}
                  onChange={this.handleChange('name')}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Organization URL"
                  value={url}
                  onChange={this.handleChange('url')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='caption'>Enter Organization Description and Information below</Typography>
                <MarkdownEditor
                  uniqueName='description'
                  setValue={(value) => this.handleMarkdownChange('description', value)}
                  value={description}
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
                <Grid item container direction='row' spacing={2}>
                  <Grid item>
                    <Button variant='contained' component='label'>
                      Choose File...
                      <input
                        type='file'
                        name='file'
                        onChange={this.handleSelectImage}
                        style={{display: 'none'}}
                      />
                    </Button>
                  </Grid>
                  <Grid item>
                    {logo &&
                    <Button variant='contained' component='label' onClick={this.handleUploadImage}>
                      Upload Image
                    </Button>
                    }
                  </Grid>
                </Grid>
                <Grid container  justify='center' spacing={2} alignItems='center'>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <DragAndDropZone/>
                      </CardContent>
                    </Card>
                  </Grid>
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
)(SponsorForm);
