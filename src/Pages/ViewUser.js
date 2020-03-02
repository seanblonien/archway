/*
Filename: ViewUser.js
Contributors:
Stephen Tate - Styled page and added about half of the functionality
Greg Keeton - Implemented editing functionality and conditional rendering of page objects
Ryan Cave - minor bug fixes after ViewCapstone routing change.
 */

import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {strapi, strapiURL} from "../constants";
import LoadingCircle from "../Components/LoadingCircle";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Fab from "@material-ui/core/Fab";
import axios from 'axios';
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import PageTitleTypography from "../Components/PageTitleTypography";
import {CardContent} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import * as url from '../Images/default-user-profile-image-png-6.png';
import {auth} from '../index.js';

const styles = theme => ({
    card: {
        raised: true,
    },
    associatedCard: {
        raised: true,
        height: '200px',
        overflow: 'auto',
    },
    button: {
        color: 'primary',
    },
    media: {
        maxWidth: 400,
        borderRadius: '25px',
    },
    primaryButton: {
        color: 'primary',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 100,
    },
    center: {
        display: 'block',
        width: '50%',
    }
});

class ViewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: '',
            open: false,
            Bio: '',
            Department: '',
            ProfilePicture: '',
            FullName: '',
            oldBio: '',
            oldDepartment: '',
            oldFullName: '',
            editable: false,
            departmentList: [],
            hasPicture: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleOpen(e, open, post) {
        this.setState({
            [open]: true,

            // Persist state for making edits to individual posts
            oldBio: post['Bio'],
            oldDepartment: post['Department'],
            oldFullName: post['FullName'],
            Bio: post['Bio'],
            Department: post['Department'],
            FullName: post['FullName']
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });

        if(name === "Picture") {
            this.setState({hasPicture: true});
        }
    };

    async handleSubmit() {
        this.handleClose();
        let userId = auth.getUser()._id;
        let url = strapiURL + '/users';
        let authToken = 'Bearer ' + localStorage.getItem('USERTOKEN');
        let newImageId = null;

        // Make the changes
        await strapi.axios.put(url + '/' + userId, {
            Bio: this.state.Bio,
            Department: this.state.Department,
            FullName: this.state.FullName
        }, {headers: {'Authorization': authToken}});

        if(this.state.hasPicture) {
                // Upload image and link it to profile
                let formData = new FormData();
                let image = document.getElementById('file-id');

                formData.append("files", image.files[0], image.files[0].name);

                await strapi.upload(formData, {headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': authToken}
                }).then(async function(response) {
                    newImageId = response[0]._id;

                    await strapi.axios.get(strapiURL + "/userpictures?user=" + userId).then(async function(response2) {
                        console.log(response2.data[0]);

                        if(response2.data.length === 0) {
                            await strapi.axios.post(strapiURL + "/userpictures", {
                                user: userId,
                                ProfilePicture: newImageId
                            },  {headers: {
                                'Authorization': authToken
                            }});
                        }
                        else {
                            await strapi.axios.delete(strapiURL + "/userpictures/" + response2.data[0]._id, {headers:{
                                'Authorization': authToken
                                }}).catch(async function(response3) {
                                await strapi.axios.post(strapiURL + "/userpictures", {
                                    user: userId,
                                    ProfilePicture: newImageId
                                },  {headers: {
                                        'Authorization': authToken
                                    }});
                            })
                        }
                    });
                });
        }
    }

    handleCapstoneClick = (capstoneName) => {
        this.props.history.push('/ViewCapstone/' + capstoneName);
    };

    async componentDidMount() {

        let user = this.props.match.params.username;
        const posts2 = await strapi.getEntries('Users');
        const depts = await strapi.getEntries("departments");
        let userId = null;

        await strapi.axios.get(strapiURL + '/users',
            {
                params: {
                    username:   user
                }
            }).then ((response) => {
                     userId = response.data[0]._id;
        });

        const pic = await strapi.axios.get(strapiURL + "/userpictures?user=" + userId);
        console.log(pic);

        if(pic.data.length !== 0) {
            let picURL = pic.data[0].ProfilePicture.url;
            this.setState({ProfilePicture: strapiURL + picURL});
        }
        else {
            this.setState({ProfilePicture: url});
        }

        console.log(this.state.ProfilePicture);

        this.setState({departmentList: depts});

        this.setState({
            loading: false,
            users: posts2
        });

        const userObj = auth.getUser();
        if(userObj && userObj.username === this.props.match.params.username) {
            this.setState({
                editable: true
            });
        }

        let tempUser = await this.getLoggedInUser();
        this.setState({user: tempUser});
    }

    async getLoggedInUser() {

        let url = strapiURL + '/users';

        return await axios.get(url, {
            params: {
                username: this.props.match.params.username
            }
        })
            .then(function(response){
                return response.data[0];
            })
    }

    render() {

        const { classes } = this.props;

        let userCapstones = [];

        for(let caps in this.state.user["createdcapstones"]){
            userCapstones.push(this.state.user["createdcapstones"][caps]);
        }

        if (!this.state.loading) {

            let picArray = [this.state.ProfilePicture];

            return(
                <div>
                    <Grid container layout={'row'} justify="center">
                        <Grid item xs={12} md={10}>
                            {this.state.editable === true ?
                                <h1><b>Your Profile</b></h1>
                                : null
                            }
                            {this.state.editable === false ?
                                <h1><b>User Profile</b></h1>
                                : null
                            }
                            <Divider/>
                        </Grid>
                    </Grid>


                    <Grid container layout={'row'} justify="center" spacing={24}>
                        <Grid item xs={12} md={10}>
                            <Card className={classes.card} style={{marginTop: '1%'}}>
                                <CardContent>
                                    <PageTitleTypography text={this.state.user['FullName']} align="left"/>
                                    <Typography variant="subtitle1">
                                        Username: {this.state.user['username']}
                                    </Typography>
                                    <Divider/>
                                        <Grid item xs={12} md={10}>
                                            {this.state.editable === true ?
                                                <Button onClick={(e) => this.handleOpen(e, 'open', this.state.user)} variant="outlined" color="primary" size="small" style={{marginTop: '1%'}}>
                                                    Edit Profile
                                                </Button>
                                                : null
                                            }

                                            <Dialog
                                                open={this.state.open}
                                                onClose={(e) => this.handleClose(e)}
                                            >
                                                <DialogTitle id="edit-profile">Edit Profile</DialogTitle>
                                                <DialogContent>
                                                    <Typography>
                                                        <TextField
                                                            id="biography"
                                                            label="About Me"
                                                            multiline
                                                            rows="10"
                                                            margin="dense"
                                                            variant="outlined"
                                                            style={{width: 500}}
                                                            onChange={this.handleChange('Bio')}
                                                            defaultValue={this.state.oldBio}
                                                        />
                                                    </Typography>
                                                    <FormControl variant="outlined" className={classes.formMargin}>
                                                        <InputLabel>
                                                            Department
                                                        </InputLabel>
                                                        <Select
                                                            native
                                                            style={{width: 500}}
                                                            value={this.state.Department.name}
                                                            onChange={this.handleChange('Department')}
                                                            input={
                                                                <OutlinedInput
                                                                    name="Department"
                                                                    labelWidth={85}
                                                                />
                                                            }
                                                        >
                                                            <option value={""}> </option>
                                                            {this.state.departmentList.map(dept => (
                                                                <option value={dept.name}>{dept.name}</option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <Typography>
                                                        <TextField
                                                            id="fullname"
                                                            label="Full Name"
                                                            margin="dense"
                                                            variant="outlined"
                                                            style={{width: 500}}
                                                            onChange={this.handleChange('FullName')}
                                                            defaultValue={this.state.oldFullName}
                                                        />
                                                    </Typography>
                                                    <Typography component="h1" align="center">
                                                        Upload a file
                                                    </Typography>
                                                    <form>
                                                        <Typography align="center">
                                                            Browse...
                                                            <input
                                                                type="file"
                                                                id="file-id"
                                                                name="file"
                                                                accept="image/*"
                                                                onChange={this.handleChange('Picture')}
                                                            />
                                                        </Typography>
                                                    </form>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Fab variant="extended" onClick={this.handleSubmit} color="primary">
                                                        Update
                                                    </Fab>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <div>
                        <Grid container layout={'row'} justify="center" spacing={24}>
                            <Grid item xs={12} md={2}>
                                <Card className={classes.card} style={{paddingBottom: '12px', height: '100%'}} >
                                    <CardHeader
                                        title="Profile Picture"
                                    >
                                    </CardHeader>
                                    <Divider/>
                                    <Grid container justify="center">
                                        {
                                            picArray.map((result) => (
                                            <img src={result} alt="profile"
                                                 style={{borderRadius: '12px',
                                                marginTop: '12px', width: '500px', height: '230px'}}></img>

                                        ))}
                                    </Grid>

                                </Card>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Card className={classes.card} style={{height: '100%'}}>
                                    <CardHeader
                                        title="Profile Details"
                                    >
                                    </CardHeader>
                                    <Divider/>
                                    <div style={{paddingLeft: '16px', paddingTop: '8px'}}>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            <b>Email:<br/></b>
                                            {this.state.user['email']}
                                        </Typography>
                                    </div>
                                    <div style={{paddingLeft: '16px', paddingTop: '8px'}}>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            <b>Department:<br/></b>
                                            {this.state.user['Department']}
                                        </Typography>
                                    </div>
                                    <br/>
                                    <div style={{paddingLeft: '16px', paddingTop: '16px'}}>
                                        <Typography variant="subtitle1" color="textPrimary">
                                            <b>About Me:<br/></b>
                                            {this.state.user['Bio']}
                                        </Typography>
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container justify="center" spacing={24}>
                            <Grid item xs={12} md={10}>
                                <Card>
                                    <CardHeader
                                        title="Associated Capstones"
                                    />
                                    <Divider/>
                                    <br/>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container justify="center">
                        <Grid item xs={12} md={10}>
                            <Grid container spacing={8}>
                                {userCapstones.map((result) => (
                                    <Grid item xs={12} md={6} style={{marginTop: '1%'}}>
                                        <Card className={classes.associatedCard} onClick={(e) => ViewUser.handleCapstoneClick(result["_id"])}>
                                            <CardContent>
                                                <SubHeadingTextTypography text={result["CapstoneName"]}/>
                                                <Divider/>
                                                <Typography variant="body2">
                                                    {result["Description"]}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        return (<div>
            < LoadingCircle />
        </div>);
    }
}

ViewUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewUser);
