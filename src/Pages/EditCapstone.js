/*
Filename: EditCapstone.js
Contributors:
Brenden Detels - Entire Page functionality and styling
 */

import {Divider} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth/withWidth";
import axios from 'axios';
import Fuse from 'fuse.js';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from "../Components/LoadingCircle";
import PageTitleTypography from "../Components/PageTitleTypography";
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import {strapi, strapiURL} from "../constants";

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
    capstoneImage: {
        height: 'auto',

        maxWidth: '100%',
        marginTop: '2%',
        borderRadius: '5px',
    },

});


class EditCapstone extends Component {
    constructor(props){
        super(props);
        this.state = {

            loading: true,
            loading2: true,
            id: '',
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
            defaultStart: '',

            currentSponsor: [],
            boolSponsor: [],

            AllUsers: [],
            Users: [],
            Participants: [],
            picture: false,
            input: '',
            userPart: false,


        };
    }

    async componentDidMount() {
        const depts = await strapi.getEntries('departments');
        this.setState({departmentList: depts});

        await strapi.axios.get(strapiURL + '/sponsors').then( response => {
            this.setState({sponsorList: response.data})
        }).catch( error => {

        });

        await strapi.axios.get(strapiURL + '/users').then(response2 => {
            this.setState({Users: response2.data});
            this.setState({AllUsers: response2.data});
            console.log(response2.data);

        }).catch( error => {

        });



        await strapi.axios.get(strapiURL + '/capstones', {
            params: {
                _id: this.props.match.params.id
            }
        }).then(response => {
            this.setState({loading:false, capstones: response.data})
        }).catch(error => {

        });

        this.setState({id: this.state.capstones[0]['id']});
        this.setState({CapstoneName: this.state.capstones[0]['CapstoneName']});
        this.setState({StartDate: this.state.capstones[0]['StartDate']});
        this.setState({EndDate: this.state.capstones[0]['EndDate']});
        this.setState({Department: this.state.capstones[0]['department'] });

        this.setState({Description: this.state.capstones[0]['Description']});


        var i = 0;
        while(i !== this.state.capstones[0]['sponsors'].length){
            this.state.currentSponsor.push(this.state.capstones[0]['sponsors'][i]);
            this.state.checkedSponsors.push(this.state.capstones[0]['sponsors'][i]);
            i++;
        }

        var j = 0;
        var partic = [];
        while(j !== this.state.capstones[0]['creators'].length){
            partic.push(this.state.capstones[0]['creators'][j]);
            j++;
        }

        this.setState({loading2: false, Participants: partic});

    }


    handleClickOpen(e, open, post) {
        this.setState({
            [open]: true,
        });
    };

    handleSponsorToggle = value => () => {
        var currentIndex = -1;

        var x = 0;
        while( x !== this.state.checkedSponsors.length){
            if(this.state.checkedSponsors[x].id === value.id){
                currentIndex = x;
            }
            x++;
        }
        if (currentIndex === -1) {
            this.state.checkedSponsors.push(value);
        } else {
            this.state.checkedSponsors.splice(currentIndex, 1);
        }
    };

    handleParticipantToggle = value => () => {
        var currentIndex = -1;

        var x = 0;
        while( x !== this.state.Participants.length){
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
        if(name === "CapstoneName"){
            this.setState({CN: true});
        }
        if(name === "Description"){
            this.setState({DS: true});
        }

        if(name === "DisplayPhoto"){
            this.setState({picture: true});
        }
    };

    handleEdit = async () => {
        const sponsorIDs = [];

        for (let i = 0; i < this.state.checkedSponsors.length; i++){
            sponsorIDs.push(this.state.checkedSponsors[i].id);
        }

        const UserIDs = [];

        for(let i = 0; i < this.state.Participants.length; i++){
            UserIDs.push(this.state.Participants[i].id);
        }

        let authToken = 'Bearer ' + localStorage.getItem('USERTOKEN');

        axios.put(strapiURL + '/Capstones/' + this.state.id, {
            CapstoneName: this.state.CapstoneName,
            Description: this.state.Description,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            department: this.state.Department.id,
            sponsors: sponsorIDs,
            creators: UserIDs,
        }, {headers:
                {'Authorization': authToken}});


        if(this.state.picture){

            await strapi.axios.put(strapiURL + '/Capstones/' + this.state.id, {
                DisplayPhoto: null,
            }, {headers:
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
            })
        }

        this.props.history.push("/ViewCapstone/" + this.state.id);
    }

    static formatDate(dateToFormat) {
        var date = new Date(dateToFormat);
        var x = date.getFullYear() + "-";
        if (date.getMonth() < 10) {
            x += '0';
            x += (date.getMonth() + 1);
        }
        else{
            x += (date.getMonth() + 1);
        }
        x += "-";
        if (date.getDate() < 10) {
            x += "0" + (date.getDate() + 1);
        }
        else{
            x += (date.getDate() + 1);
        }
        return x;
    }

    static formatDefaultDate(dateToFormat){
        return dateToFormat.substr(0, 10);
    }

    checkSponsor(id) {
        var k = 0;
        while( k !== this.state.currentSponsor.length){
            if(id === this.state.currentSponsor[k].id){
                return true;
            }
            k++;
        }
        return false;
    }

    checkUser(id, username) {
        var k = 0;
        while(k != this.state.Participants.length){
            if(id === this.state.Participants[k]._id){
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
        const {classes} = this.props;

        if (!this.state.loading && !this.state.loading2) {
            var i = 0;
            while(i !== this.state.capstones[0]['sponsors'].length){
                this.state.currentSponsor.push(this.state.capstones[0]['sponsors'][i]);
                i++;
            }

            return (

                <div>
                    <Grid container justify="center">
                        <Grid item xs={12} md={10}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <PageTitleTypography text="Edit Capstone"/>

                                </CardContent>
                            </Card>

                        </Grid>

                        <Grid item xs={12} md={10}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <SubHeadingTextTypography align={"center"} text="Basic Info"/>
                                    <Divider/>
                                    <Grid container justify={"center"}>

                                            <Grid item xs={12}>
                                                <Typography variant="subheading" style={{marginTop: '2%'}}>
                                                    Capstone Name
                                                </Typography>

                                                    <FormControl margin="dense" required fullWidth>
                                                        <TextField
                                                            id="cap-name"
                                                            name="cap-name"
                                                            autoComplete="cap-name"
                                                            autoFocus
                                                            variant={"outlined"}
                                                            value={this.state.CapstoneName}
                                                            defaultValue={this.state.CapstoneName}
                                                            helperText="*Must be > 4 characters or < 200 characters"
                                                            error={this.state.nameTaken}
                                                            onChange={this.handleChange('CapstoneName')}
                                                        />
                                                    </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="subheading" style={{marginTop: '2.5%'}}>
                                                    Start Date
                                                </Typography>

                                                <form className={classes.formMargin} noValidate>
                                                    <TextField
                                                        id="date"
                                                        type="date"
                                                        variant={"outlined"}
                                                        className={"container"}
                                                        value={EditCapstone.formatDefaultDate(this.state.StartDate)}
                                                        onChange={(event) => this.setState({StartDate: event.target.value})}
                                                    />
                                                </form>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="subheading" style={{marginTop: '2.5%'}}>
                                                    End Date
                                                </Typography>
                                                <form className={classes.formMargin} noValidate>
                                                    <TextField
                                                        id="date"
                                                        variant={"outlined"}
                                                        type="date"
                                                        className={"container"}
                                                        value={EditCapstone.formatDefaultDate(this.state.EndDate)}
                                                        onChange={(event) => this.setState({EndDate: event.target.value})}
                                                    />
                                                </form>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="subheading" style={{marginTop: '2.5%'}}>
                                                    Description
                                                </Typography>
                                                <TextField
                                                    id="Description"
                                                    variant={"outlined"}
                                                    multiline
                                                    rowsMax="20"
                                                    onChange={this.handleChange('Description')}
                                                    className={classes.formMargin}
                                                    style={{width: '100%'}}
                                                    value={this.state.Description}
                                                    defaultValue={this.state.Description}
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
                                    <SubHeadingTextTypography align={"center"} text="Sponsors & Department"/>
                                    <Divider/>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography  variant="subheading" style={{marginTop: '2.5%'}}>
                                                Select Your Sponsors
                                            </Typography>
                                            <Divider/>
                                            <List dense className={classes.list} subheader={<li />}>
                                                {this.state.sponsorList.map((value, i) => (
                                                    <Typography variant="subtitle2" style={{marginTop: '1%'}}>
                                                    <ListItem key={value} button>

                                                        <ListItemText primary={value.name} />
                                                        <ListItemSecondaryAction>
                                                            <Checkbox defaultChecked={this.checkSponsor(value.id)}
                                                                onChange={this.handleSponsorToggle(value)}
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    </Typography>
                                                ))}

                                            </List>
                                            <Divider/>
                                            <Grid item xs={12}>
                                                <Typography variant="subheading" style={{marginTop: '2.5%'}}>
                                                    Select Your Department
                                                </Typography>
                                                <Divider/>
                                                <FormControl className={classes.formMargin}>
                                                    <Select
                                                        native
                                                        value={this.state.Department.name}
                                                        onChange={this.handleChange('Department')}
                                                    >
                                                        <option value={" "}> </option>
                                                        {this.state.departmentList.map(dept => (
                                                            <option value={dept.name}>{dept.name}</option>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        <Divider style={{marginTop: '2.5%'}}/>

                                                    <Grid container>
                                                        <Grid xs={9}>
                                                            <Typography style={{marginTop: '2.5%'}} variant="h7">
                                                            Other Participants
                                                            </Typography>

                                                        </Grid>
                                                        <Grid xs={3}>
                                                            <form className={classes.container} noValidate autoComplete="off">
                                                                <TextField
                                                                    id="standard-name"
                                                                    placeholder="Search..."
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
                                                    </Grid>
                                                <Divider/>
                                                        <List dense className={classes.list} subheader={<li />}>

                                                            {this.state.Users.map((value, i) => (
                                                                <Typography variant="subtitle2" style={{marginTop: '1%'}}>
                                                                    <ListItem key={value} button>

                                                                        <ListItemText primary={this.checkValue(value)} />
                                                                        <ListItemSecondaryAction>
                                                                            <Checkbox defaultChecked={this.checkUser(value._id, value.username)}
                                                                                      onChange={this.handleParticipantToggle(value)}
                                                                            />
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Divider/>
                                                                </Typography>
                                                            ))}

                                                        </List>
                                            <Divider/>
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
                                                accept={"image/*"}
                                                onChange={this.handleChange('DisplayPhoto')}
                                                style={{marginBottom: '2%'}}
                                            />

                                            <Grid xs={7}>
                                                <img src={strapiURL + this.state.capstones[0]['DisplayPhoto'].url } className={classes.capstoneImage} alt="Display"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} md={10}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleEdit}
                                    style={{marginTop: '1%'}}
                                    component={Link}
                                    to={"/ViewCapstone/" + this.state.id}
                                >
                                    Edit Capstone
                                </Button>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        else{
            return (<div>
                < LoadingCircle />
            </div>);
        }
    }
}

export default compose(
    withStyles(styles),
    withWidth(),
)(EditCapstone);


