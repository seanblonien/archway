/*
Filename: CreateCapstone.js
Contributors:
Stephen Tate - Initial style layout. Profanity filtering.
Ryan Cave - Original functionality for Create Capstone (e.g. posting a capstone with a photo/users/sponsors/depts/title/etc, ensuring required fields were filled out, etc)
Brenden Detels - Redid styling for more compact approach & added search for users, checkboxes for sponsors. Did page functionality.
Greg Keeton - Did image uploads, post modal
 */

import React, { Component } from 'react';
import {strapi, strapiURL} from "../constants";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import PageTitleTypography from "../Components/PageTitleTypography";
import withWidth from "@material-ui/core/withWidth/withWidth";
import compose from 'recompose/compose';
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import Filter from 'bad-words';
import Fuse from "fuse.js";

const styles = theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '300px',

    },
    card: {
        marginTop: '1%',
    },
    leftColCard: {
        marginRight: '2%',
        marginTop: '1%',
    },
    formMargin: {
        marginTop: '.5%',
    },
    textField: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        width: 250,
        placeholder: "Search..."
    },
});


class CreateCapstone extends Component {
    constructor(props){
        super(props);
        this.state = {
            CapstoneName: '',
            StartDate: '',
            EndDate: '',
            Description: '',
            DisplayPhoto: '',
            Department: '',
            Username: JSON.parse(localStorage.getItem("USER"))._id,
            capstones: [],
            departmentList: [],
            sponsorList: [],
            checkedSponsors: [],
            AllUsers: [],
            Users: [],
            Participants: [],
        };
    }

    async componentDidMount() {
        //pull data from strapi/backend
        const caps = await strapi.getEntries('capstones');
        const depts = await strapi.getEntries('departments');
        const spons = await strapi.getEntries('sponsors');
        //sets the various states
        this.setState({capstones: caps});
        this.setState({departmentList: depts});
        this.setState({sponsorList: spons});

        await strapi.axios.get(strapiURL + '/users').then(response2 => {
            this.setState({Users: response2.data});
            this.setState({AllUsers: response2.data});


        }).catch( error => {

        });

    }

    handleSponsorToggle = value => () => {
        const { checkedSponsors } = this.state;
        const currentIndex = checkedSponsors.indexOf(value);
        const newChecked = [...checkedSponsors];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checkedSponsors: newChecked,
        });
    };

    isFormValid = () => {
        const {CapstoneName, Description, DisplayPhoto, checkedSponsors, Department} = this.state;

        let filter = new Filter();

        let profane = false;

        if(filter.isProfane(CapstoneName) || filter.isProfane(Description)){
            profane = true;
        }

        let validName = true;

        for (let i = 0; i < this.state.capstones.length; i++){
            if (this.state.capstones[i].CapstoneName.toUpperCase() === CapstoneName.toUpperCase()){
                validName = false;
                break;
            }
        }

        return CapstoneName && Description && DisplayPhoto && Department && (checkedSponsors.length > 0) && validName && !profane;
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });

        if (name === "Department"){
            for (let i = 0; i < this.state.departmentList.length; i++){
                if (this.state.departmentList[i].name === event.target.value){
                    this.setState({[name]: this.state.departmentList[i]});
                    break;
                }
            }
        }

    };

    //Sets the card to a certain format based on screen size
    setLeftColClass(props){
        const {classes} = this.props;
        if(props.width === 'xl'){
            return classes.leftColCard;
        }else if(props.width === 'lg'){
            return classes.leftColCard;
        }else if(props.width ==='md'){
            return classes.leftColCard;
        }else if(props.width ==='sm'){
            return classes.card
        }
        return classes.card;
    }

    handleSubmit() {
        if (this.state.DisplayPhoto == null){
            return;
        }

        // get Sponsor IDs from Sponsor List
        const sponsorIDs = [];

        for (let i = 0; i < this.state.checkedSponsors.length; i++){
            sponsorIDs.push(this.state.checkedSponsors[i].id);
        }

        const UserIDs = [];

        for(let i = 0; i < this.state.Participants.length; i++){
            UserIDs.push(this.state.Participants[i].id);
        }

        let authToken = 'Bearer ' + localStorage.getItem('USERTOKEN');



        strapi.axios.post(strapiURL + '/Capstones', {
            CapstoneName: this.state.CapstoneName,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            Description: this.state.Description,
            moderator: this.state.Username,
            department: this.state.Department.id,
            creators: UserIDs,
            sponsors: sponsorIDs,
        },
            {headers:
                    {'Authorization': authToken}}).then(async function(response) {
            console.log('Data', response.data['_id']);

            // Get refId of post that was just made
            let refId = response.data['_id'];

            // Upload image and link it to existing post
            let formData = new FormData();
            let image = document.getElementById('file-id');
            formData.append("files", image.files[0], image.files[0].name);
            formData.set("refId", refId);
            formData.set("ref", "capstone");
            formData.set("field", "DisplayPhoto");

            await strapi.upload(formData, {headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authToken
                }}).catch(function(err) {
                console.log('Upload failed');
                console.log(err);
            });
        }).catch (function (error) {
        });
    }

    checkUser(id) {
        var k = 0;
        while(k != this.state.Participants.length){
            if(id === this.state.Participants[k].id){
                return true;
            }
            k++;
        }
        return false;
    }

    handleSearchChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });


        let match;
        let phrase;
        let searchOptions = {
            shouldSort: true,
            threshold: 0.3,
            minMatchCharLength: 1,
            keys: ['FullName',
                'username',
            ]
        };

        if (this.state.input) {
            phrase = this.state.input;
        }


        if (phrase !== undefined) {
            let fuse = new Fuse(this.state.Users, searchOptions);
            this.setState({Users: fuse.search(phrase)})
        } else {
            this.setState({Users: this.state.AllUsers})
        }
    };

    handleParticipantToggle = value => () => {
        var currentIndex = -1;

        var x = 0;
        while( x != this.state.Participants.length){
            if(this.state.Participants[x].id === value.id){
                currentIndex = x;
            }
            x++;
        }
        if (currentIndex === -1) {
            this.state.Participants.push(value);
        } else {
            this.state.Participants.splice(currentIndex,1);
        }
    };

    checkValue(value){
        if(value.FullName === ""){
            return ("Username: " + value.username);
        }
        else{
            return <Grid container>
                     <Grid xs={12}>{"Username: " + value.username}
                     </Grid>
                    <Grid xs={12}> {"Full Name: " + value.FullName}
                    </Grid>
                    </Grid>
        }


    }


    render() {

        const { classes } = this.props;

        return(
            <div>
                {/*Page header*/}
                <Grid container justify="center">
                    <Grid item xs={12} md={10}>
                        <Card className={classes.card}>
                            <CardContent>
                                <PageTitleTypography text="Create A Capstone"/>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={10}>
                        <Card className={classes.card}>
                            <CardContent>
                                <SubHeadingTextTypography align={"center"} text="Basic Info"/>
                                <Divider/>
                                <Grid container  justify={"center"}>
                                    <Grid item xs={12}>
                                        {/*Form for capstone name*/}

                                        <FormControl margin="dense" required fullWidth>
                                            <InputLabel htmlFor="Capstone Name">Capstone Name</InputLabel>
                                            <Input
                                                id="cap-name"
                                                name="cap-name"
                                                autoComplete="cap-name"
                                                autoFocus
                                                error={this.state.nameTaken}
                                                value={this.state.CapstoneName}
                                                onChange={this.handleChange('CapstoneName')}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>

                                        {/*Form input field for start date*/}
                                        <form className={classes.formMargin} noValidate>
                                            <TextField
                                                id="date"
                                                label="Start Date"
                                                type="date"
                                                defaultValue="2019-01-2019"
                                                className={"container"}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={this.state.StartDate}
                                                onChange={(event) => this.setState({StartDate: event.target.value})}
                                            />
                                        </form>

                                    </Grid>

                                    <Grid item xs={12}>
                                        {/*Form input field for end date*/}
                                        <form className={classes.formMargin} noValidate>
                                            <TextField
                                                id="date"
                                                label="End Date"
                                                type="date"
                                                defaultValue="2019-01-2019"
                                                className={"container"}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={this.state.EndDate}
                                                onChange={(event) => this.setState({EndDate: event.target.value})}
                                            />
                                        </form>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/*Input field for the project description*/}
                                        <TextField
                                            label="Description"
                                            multiline
                                            rowsMax="20"
                                            value={this.state.Description}
                                            onChange={this.handleChange('Description')}
                                            className={classes.formMargin}
                                            style={{width: '100%'}}
                                            required={true}
                                        >

                                        </TextField>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Card className={classes.card}>
                            <CardContent>
                                {/*Right column*/}
                                <SubHeadingTextTypography align={"center"} text="Sponsors & Department"/>
                                <Divider/>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subheading" style={{marginTop: '2.5%'}}>
                                            Select Your Sponsors
                                        </Typography>
                                        <Divider/>
                                        <List dense className={classes.list} subheader={<li />}>
                                            {/*Scrollable list of sponsors*/}
                                            {this.state.sponsorList.map(value => (
                                                <ListItem key={value} button>

                                                    <ListItemText primary={value.name} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            onChange={this.handleSponsorToggle(value)}
                                                        />
                                                    </ListItemSecondaryAction>

                                                </ListItem>

                                            ))}

                                        </List>
                                        <Divider/>
                                        {/*Department drop down menu*/}
                                        <FormControl className={classes.formMargin}>
                                            <InputLabel>Department</InputLabel>
                                            <Select
                                                native
                                                value={this.state.Department.name}
                                                onChange={this.handleChange('Department')}
                                            >
                                                <option value={""}> </option>
                                                {this.state.departmentList.map(dept => (
                                                    <option value={dept.name}>{dept.name}</option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid container>
                                        <Grid xs={9}>
                                            <Typography style={{marginTop: '2.5%'}} variant="h7">
                                                Add or Remove Participants
                                            </Typography>

                                        </Grid>
                                        <Grid xs={3}>
                                            <form className={classes.container} noValidate autoComplete="off">
                                                <TextField
                                                    id="standard-name"
                                                    placeholder="Search by Username or Name"
                                                    className={classes.textField}
                                                    value={this.state.input}
                                                    onChange={this.handleSearchChange('input')}
                                                    margin="normal"
                                                    onKeyDown={this.keyPress}
                                                    InputProps={{
                                                        className: classes.input
                                                    }}
                                                />
                                            </form>

                                        </Grid>

                                        <List dense className={classes.list} subheader={<li />}>

                                            {this.state.Users.map((value, i) => (

                                                <Typography variant="subtitle2" style={{marginTop: '1%'}}>
                                                    <ListItem key={value}>

                                                        <ListItemText primary={ this.checkValue(value)} />
                                                        <ListItemSecondaryAction>
                                                            <Checkbox defaultChecked={this.checkUser(value.id)}
                                                                      onChange={this.handleParticipantToggle(value)}
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    <Divider/>
                                                </Typography>

                                            ))}

                                        </List>
                                    </Grid>


                                    <Grid item xs={12}>

                                        {/*Upload photo button*/}
                                        <Typography variant="subtitle2" style={{marginTop: '1%'}}>
                                            Upload Photo
                                        </Typography>

                                        <input
                                            required
                                            type="file"
                                            id="file-id"
                                            name="file"
                                            accept="image/*"
                                            onChange={this.handleChange('DisplayPhoto')}
                                            style={{marginBottom: '2%'}}
                                        />
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={10}>
                        {/*Submit button*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!this.isFormValid()}
                                onClick={() => {this.handleSubmit()}}
                                style={{marginTop: '1%'}}
                            >
                                Add Capstone
                            </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    withWidth(),
)(CreateCapstone);
