/*
Filename: ViewCapstone.js
Contributors:
Stephen Tate - Styled page and some functionality
Brenden Detels - Most of the page functionality
Ryan Cave - Social Media Integration, Add Photo & Add User functionality, extensive bug testing/error handling, conditional rendering for all elements based on user association with capstone.
Greg Keeton - Make/Edit/Delete Post and Image Carousel
 */

import {Dialog, Divider} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth";
import axios from 'axios';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React from 'react';
import {Carousel} from "react-responsive-carousel";
import {Link} from 'react-router-dom';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import compose from 'recompose/compose';
import LoadingCircle from "../Components/LoadingCircle";
import '../Components/PageTitleTypography';
import PageTitleTypography from "../Components/PageTitleTypography";
import SubHeadingTextTypography from "../Components/SubHeadingTextTypography";
import {strapi, strapiURL} from "../constants";
import * as url from "../Images/default-user-profile-image-png-6.png";
import { auth } from '../index'

const styles = theme => ({
    card: {
        raised: true,
        marginTop: '1%',
    },
    leftColCard: {
        marginRight: '2%',
        marginTop: '1%',
    },
    bottomCard:{
        marginTop: '1%',
        marginBottom: '2%',
    },
    capstoneImage: {
        height: 'auto',
        maxWidth: '100%',
        marginTop: '2%',
        borderRadius: '5px',
    },
    textContainer: {
        position: 'relative',
        height: '200px',
        width: '200px',
        marginBottom: '2%',
        background: '#f1f1f1',
        borderRadius: '5px',
    },
    textBox: {
        position: 'absolute',
        bottom: '0',
        color: '#f1f1f1',
        background: 'rgb(0,0,0, 0.5)',
        width: '100%',
        padding: '10px',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
    },
    titleText: {
        variant: "h1",
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
    },
    cards: {
        backgroundColor: '#006400'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    gridListContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    photoGalleryGridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
});

class ViewCapstone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            open: false,
            editOpen: false,
            title: '',
            content: '',
            media: '',
            userOpen: false,
            newUser: '',
            Username: '',
            photoOpen: false,
            newPhoto: '',
            capstone: '',
            team: [],
            teamPics: []
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleUserClickOpen = () =>{
        this.setState({ userOpen: true });
    };

    handleUserClose = () =>{
        this.setState({ userOpen: false });
    };

    handleUserSubmit(capstoneId, creators){
        this.setState({ userOpen: false });


        for (let i = 0; i < this.state.users.length; i++){
            if (this.state.users[i].username.toUpperCase() === this.state.newUser.toUpperCase()){
                creators.push(this.state.users[i]._id);
                break;
            }
        }

        axios.put(strapiURL + '/capstones/' + capstoneId, {
            creators: creators
        })

    };

    handlePhotoClickOpen = () =>{
        this.setState({ photoOpen: true });
    };

    handlePhotoClose = () =>{
        this.setState({ photoOpen: false });
    };

    isCreator(obj){
        let creators = obj['creators'];

        for (let i = 0; i < creators.length; i++){
            if (creators[i]._id === this.state.Username){
                return true;
            }
        }

        return false;
    }

    getTeamPics = async () => {
        let pic;
        let picURLS = [];
        for(let member in this.state.team) {
            pic = await strapi.axios.get(strapiURL + "/users/" + this.state.team[member]._id);
            console.log(pic);
            if(pic.data.ProfilePicture !== null) {
                picURLS[member] = pic.data.ProfilePicture.url;
            }
        }
        this.setState({teamPics: picURLS});
    }

    componentDidMount = async () => {
        const users1 = await strapi.getEntries('Users');

        // If we're logged-in, store the user Id and update the count values.
        const userObj = auth.getUser();
        if (userObj){
            this.setState({Username: userObj._id});
        }

        let tempCapstone = await this.getCapstone();
        this.setState({capstone: tempCapstone});
        this.setState({team: this.state.capstone.creators});

        this.getTeamPics();

        this.setState({loading: false, users: users1});


        var x = this.state.capstone['viewcount'];
        x++;

        axios.put(strapiURL + '/Capstones/' + this.state.capstone.id, {
            viewcount: x,
        });

    }

    getCapstone  = async () =>{
        let url = strapiURL + '/capstones/' + this.props.match.params.capstoneID;
        return await axios.get(url)
            .then(function(response){
                return response.data;
            })
    }

    //Ensures margin is there when screen is large and dissapears when screen resizes to below md and col resizes
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

    //Takes ugly JSON date and returns readable date
    static formatDate(dateToFormat){
        var date = new Date(dateToFormat);
        return date.toUTCString().split(' ').slice(0, 4).join(' ');
    }

    //Calcs how many columns of users should be shown for team pictures
    static getColumnsForTeamPics(props){
        if(props.width === 'xl'){
            return 4;
        }else if(props.width === 'lg'){
            return 4;
        }else if(props.width ==='md'){
            return 6;
        }else if(props.width ==='sm'){
            return 6;
        }
        return 12;
    }

    static showPicture(pictureURL){
        if(pictureURL === undefined){
            return <div>
                <img src={url} width="100%" height="auto" style={{ borderRadius: '5px', display: 'block'}} alt=""/>
            </div>
        }
        else{
            return <div>

                <img src={strapiURL + pictureURL} width="100%" height="auto" style={{ borderRadius: '5px', display: 'block'}} alt=""/>

            </div>
        }
    }

    render() {
        const {classes} = this.props;

        if (!this.state.loading) {

            let picArray = [];
            for (let pic in this.state.capstone['Pictures']) {
                picArray.push(strapiURL + this.state.capstone['Pictures'][pic].url);
            }

            let creatorArray = [];
            let picCreatorArray = [];

            for(let i in this.state.team) {
                creatorArray.push(this.state.team[i]);
                picCreatorArray.push(this.state.teamPics[i]);
            }

            let postArray = [];
            for (let posting in this.state.capstone['posts']) {
                postArray.push(this.state.capstone['posts'][posting]);
            }
            return <div>
                <Grid container justify="center">
                    <Grid item xs={10}>

                        <Card className={classes.card}>
                            <CardContent>

                                <Grid container alignItems="center">

                                    { /* Facebook/Twitter buttons */}

                                    <FacebookShareButton
                                        url={"www.baylor.edu"}
                                        quote={this.state.capstone.CapstoneName}
                                        hashtag={"Capstone"}
                                    >
                                        <FacebookIcon
                                            size={28}
                                            round/>
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={"www.baylor.edu"}
                                        title={this.state.capstone.CapstoneName}
                                        hashtags={["Capstone"]}
                                    >
                                        <TwitterIcon
                                            size={28}
                                            round/>
                                    </TwitterShareButton>

                                    <LinkedinShareButton
                                        url={"www.baylor.edu"}
                                        title={this.state.capstone.CapstoneName}
                                        description={this.state.capstone['Description']}
                                    >
                                        <LinkedinIcon
                                            size={28}
                                            round/>
                                    </LinkedinShareButton>
                                </Grid>

                                {/*Title, Capstone Image, Start/End Date*/}
                                <PageTitleTypography text={this.state.capstone.CapstoneName}/>

                                <Divider/>
                                <Typography align={"center"} style={{marginBottom: '1%'}}>
                                    <img src={strapiURL + this.state.capstone['DisplayPhoto'].url } className={classes.capstoneImage} alt="Display"/>
                                </Typography>
                            </CardContent>
                        </Card>
                        <div>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Card className={this.setLeftColClass(this.props)}>
                                        <CardContent>
                                            <SubHeadingTextTypography text="Project Info" align="center"/>
                                            <Divider/>
                                            <Typography variant="subheading" style={{marginTop: '2%'}}>
                                                <b>Start Date:</b> {ViewCapstone.formatDate(this.state.capstone['StartDate'])}
                                            </Typography>
                                            <Typography variant="subheading">
                                                <b>Date Completed:</b> {ViewCapstone.formatDate(this.state.capstone['EndDate'])}
                                            </Typography>
                                            <Typography variant="subheading" style={{marginTop: '2%'}}>
                                                <b>View Count:</b> {this.state.capstone.viewcount}
                                            </Typography>
                                            <Typography variant="subheading" style={{marginTop: '2%'}}>
                                                <b>Department: </b> {this.state.capstone['department']['name']}
                                            </Typography>
                                            <Typography variant="subheading">
                                                <div>
                                                <b>Sponsors:</b>
                                                {this.state.capstone.sponsors.map((result, i) => (
                                                    <div>{result.name}</div>
                                                ))}
                                                </div>
                                            </Typography>
                                            <Typography variant="subheading" style={{marginTop: '2%'}}>
                                                <b>Description: </b> {this.state.capstone['Description']}
                                            </Typography>
                                        </CardContent>
                                    </Card>


                                    <Card className={this.setLeftColClass(this.props)}>
                                        {picArray.length > 0 &&
                                        <CardContent>
                                            <SubHeadingTextTypography text="Photo Gallery" align="center"/>

                                            { /* Add A New Photo */}

                                            {this.isCreator(this.state.capstone) &&
                                            <div align="center">
                                                <Button onClick={this.handlePhotoClickOpen}>
                                                    <Typography color="primary" variant="h6" component="span">
                                                        Add Photo
                                                    </Typography>
                                                </Button>
                                                <Dialog
                                                    open={this.state.photoOpen}
                                                    onClose={this.handleUserClose}
                                                >
                                                    <DialogTitle>Add New Photo</DialogTitle>
                                                    <DialogContent>
                                                        <form>
                                                            <Typography>
                                                                <input
                                                                    type="file"
                                                                    id="file-id2"
                                                                    name="file"
                                                                    accept="image/*"
                                                                    onChange={this.handleChange('newPhoto')}
                                                                />
                                                            </Typography>
                                                        </form>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handlePhotoClose} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.handlePhotoSubmit(this.state.capstone['_id'], this.state.capstone['creators'])}
                                                            color="primary">
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            }

                                            <Divider/>
                                            < br/>
                                            <div className={classes.gridListContainer}>
                                                <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                                                    {picArray.map((result, i) => {
                                                        return <img height={300} width={300} alt="post"
                                                                    src={result}
                                                                    key={i}/>;
                                                    })}
                                                </Carousel>
                                            </div>
                                        </CardContent>}
                                        {picArray.length === 0 &&
                                        <CardContent>
                                            <SubHeadingTextTypography text="Photos Coming Soon" align="center"/>
                                            {this.isCreator(this.state.capstone) &&
                                            <div align="center">
                                                <Button onClick={this.handlePhotoClickOpen}>
                                                    <Typography color="primary" variant="h6" component="span">
                                                        Add Photo
                                                    </Typography>
                                                </Button>
                                                <Dialog
                                                    open={this.state.photoOpen}
                                                    onClose={this.handleUserClose}
                                                >
                                                    <DialogTitle>Add New Photo</DialogTitle>
                                                    <DialogContent>
                                                        <form>
                                                            <Typography>
                                                                <input
                                                                    type="file"
                                                                    id="file-id2"
                                                                    name="file"
                                                                    accept="image/*"
                                                                    onChange={this.handleChange('newPhoto')}
                                                                />
                                                            </Typography>
                                                        </form>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handlePhotoClose} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.handlePhotoSubmit(this.state.capstone['_id'], this.state.capstone['creators'])}
                                                            color="primary">
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            }
                                        </CardContent>}
                                    </Card>
                                </Grid>
                                {
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <SubHeadingTextTypography text="The Team" align="center"/>

                                                { /* Add a user */}

                                                {this.isCreator(this.state.capstone) &&
                                                <div align="center">
                                                    <Button onClick={this.handleUserClickOpen}>
                                                        <Typography color="primary" variant="h6" component="span">
                                                            Add Members
                                                        </Typography>
                                                    </Button>
                                                    <Dialog
                                                        open={this.state.userOpen}
                                                        onClose={this.handleUserClose}
                                                    >
                                                        <DialogTitle>Add Team Member</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                To add a new group member, type their username here.
                                                                Group members must be registered on the site to be added
                                                                to capstones.
                                                            </DialogContentText>
                                                            <TextField
                                                                margin="dense"
                                                                id="name"
                                                                label="Username"
                                                                type="text"
                                                                onChange={this.handleChange('newUser')}
                                                                fullWidth
                                                            />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={this.handleUserClose} color="primary">
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={() => this.handleUserSubmit(this.state.capstone['_id'], this.state.capstone['creators'])}
                                                                color="primary">
                                                                Submit
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                                }
                                                { /* Code for showing members} */}

                                                <Divider/>

                                                {creatorArray.length > 0 && <Grid container style={{marginTop: '2%'}}>

                                                    {creatorArray.map((result, i) => (
                                                        <Grid item xs={ViewCapstone.getColumnsForTeamPics(this.props)} key={i}>
                                                            <div className={classes.textContainer}>
                                                                <Button component={Link}
                                                                        to={"/ViewProfile/" + result.username}
                                                                        style={{height: '100%', width: '100%'}}>
                                                                    <div>
                                                                        {ViewCapstone.showPicture(picCreatorArray[i])}
                                                                    </div>
                                                                    <div className={classes.textBox}>
                                                                        {result.FullName === '' && result.username}
                                                                        {result.FullName}
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </Grid>
                                                    ))}

                                                </Grid>}

                                                {creatorArray.length === 0 &&
                                                <Grid container style={{marginTop: '2%'}}>
                                                    <Grid item xs={ViewCapstone.getColumnsForTeamPics(this.props)}>
                                                        Coming Soon
                                                    </Grid>
                                                </Grid>
                                                }

                                            </CardContent>
                                        </Card>
                                    </Grid>}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        }
        return (<div>
            < LoadingCircle />
        </div>);
    }
}

export default compose(
    withStyles(styles),
    withWidth(),
)(ViewCapstone);

