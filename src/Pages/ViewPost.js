/*
Filename: ViewPost.js
Contributors:
Brenden Detels - page functionality
Greg Keeton - page styling, comment modal
 */

import {Dialog} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import withWidth from "@material-ui/core/withWidth";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Filter from "bad-words";
import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import compose from 'recompose/compose';
import LoadingCircle from "../Components/LoadingCircle";
import {strapi, strapiURL} from "../constants";

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

class ViewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            post: '',
            commentContent: '',
            open: false,
        };

        ViewPost.getUsername = ViewPost.getUsername.bind(this);
    }
    async componentDidMount() {

        const posts2 = await strapi.getEntries('Posts');
        this.setState({loading: false, posts: posts2});

        if(localStorage.getItem('USER') !== null) {
            this.setState({
                editable: true
            });
        }

        let tempPost = await this.getPost();

        await this.setState({post: tempPost});
    }

    async getPost(){
        return await strapi.getEntry('posts', this.props.match.params.id);
    }

    handleCreateComment(postID, open) {
        this.setState({[open]: false});
        // Make the initial post
        let url = strapiURL + '/comments';

        let date = new Date();
        if(this.state.editable === true) {
            let userID = JSON.parse(localStorage.getItem("USER"))._id;
            let username = JSON.parse(localStorage.getItem('USER')).username;

            console.log('userID: ' + userID);

            axios.post(url, {
                Time: date,
                content: this.state.commentContent,
                post: postID,
                user: userID,
                username: username,
                editable: false
            });

            this.props.history.push('/ViewPost/' + postID);
        }
    }

    static async getUsername(userID) {
        return await ViewPost.usernameLookup(userID);
    }

    static async usernameLookup(userID) {
        await strapi.getEntry('users', userID).then((response) => {
            //console.log(response.username);
            return response.username;
        });
    }

    handleDelete = (e, resultID, postID) => {
        let url = strapiURL + '/comments/' + resultID;
        let authToken = 'Bearer ' + localStorage.getItem('USERTOKEN');
        axios.delete(url, {headers: {'Authorization': authToken}});

        this.props.history.push('/ViewPost/' + postID);
    };

    isFormValid = () => {
        const content = this.state.commentContent;

        let empty = true;

        if(this.state.commentContent.length > 0){
            empty = false;
        }

        let filter = new Filter();

        let profane = false;

        if(filter.isProfane(content)){
            profane = true;
        }

        return !profane && !empty;
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleClose(e, open) {
        this.setState({[open]: false});
    };

    handleClickOpen(e, open, post) {
        this.setState({
            [open]: true,

            // Persist state for making edits to individual posts
            postId: post.id,
            postTitle: post.title,
            postCont: post.content
        });
    };

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

    static alignCommentButton(props){
        if(props.width === 'xl'){
            return "";
        }else if(props.width === 'lg'){
            return "";
        }else if(props.width ==='md'){
            return "";
        }else if(props.width ==='sm'){
            return ""
        }
        return "center";
    }

    checkUserLoggedIn(result2) {
        if ("USER" in localStorage) {
            if (JSON.parse(localStorage.getItem('USER')).username === result2.username) {
                var icons = (<IconButton aria-label="Delete"
                                         onClick={(e) => ViewPost.handleDelete(e, result2.id, this.state.post['_id'])}>
                    <DeleteIcon fontSize="small"/> </IconButton>);
                return icons;
            }
        }
    }


    render() {

        const {classes} = this.props;

        if (!this.state.loading) {
            let commentArray = [];

            var x = 0;
            for(var com in this.state.post['comments']){
                commentArray.push(this.state.post['comments'][com]);
                x++;
            }

            let picArray = [];
            for(var pic in this.state.post['media']){
                picArray.push(strapiURL + this.state.post['media'][pic].url);
            }

            return <div>
                <div>
                    {/*Page Header*/}
                    <Grid container direction="row" justify="center" spacing={16}>
                        <Grid item md={10} xs={12}>
                            <Typography variant="h3" style={{marginTop: '16px'}}>{this.state.post['title']}</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>
                    {/*Content & image carousel*/}
                    <div>
                        <Grid container direction="row" justify="center">
                            <Grid item md={10} xs={12}>
                                <Card className={this.setLeftColClass(this.props)}>
                                    <CardContent>
                                        <Typography variant="h5">Post Content</Typography>
                                        <Divider/>
                                        <br/>
                                        <Typography variant="subheading">{ this.state.post['content'] } </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <br/>

                        <Grid container direction="row" justify="center" spacing={16}>
                            <Grid item md={5} xs={12} sm={12}>
                                <Card className={classes.card}>
                                    <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                                        {picArray.map((result) => {
                                            return(
                                                <div>
                                                    <img height={300} width={300} alt="post" src={result}/>
                                                </div>
                                            );
                                        })}
                                    </Carousel>
                                </Card>
                            </Grid>

                            <Grid item md={5} xs={12} sm={12}>
                                <Card className={classes.card} style={{maxHeight: 520, overflow: 'auto'}}>
                                    <List style={{backgroundColor: '#f1f1f1'}}>
                                        <ListSubheader>
                                            <Typography variant="h4">
                                                Comments ({commentArray.length})
                                                {this.state.editable === true &&
                                                <Grid container justify={ViewPost.alignCommentButton(this.props)}>
                                                    <Button onClick={(e) => this.handleClickOpen(e, 'open', e)}
                                                            variant="outlined" color="primary" style={{marginBottom: '1%', marginLeft: '1%'}}>
                                                        Create Comment
                                                    </Button>
                                                </Grid>
                                                }
                                                <Divider/>
                                            </Typography>
                                        </ListSubheader>
                                                {commentArray.map( (result2,j) => {
                                                    return(
                                                    <div>
                                                        <ListItem key={result2}>
                                                            <Card style={{width: '100%'}}>
                                                                <CardHeader
                                                                    subheader={"(#" + (j + 1) + ") - Author: " + result2.username}
                                                                >
                                                                </CardHeader>
                                                                <Divider/>
                                                                <CardContent>
                                                                    <Typography>
                                                                        {result2.content}
                                                                    </Typography>
                                                                    {this.checkUserLoggedIn(result2)}

                                                                </CardContent>
                                                            </Card>
                                                        </ListItem>
                                                    </div>
                                                );

                                                })}
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>

                    <br/>

                    <Grid container justify="center">


                    </Grid>

                </div>

                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={(e) => this.handleClose(e, 'open')}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Your Comment</DialogTitle>
                        <DialogContent>
                            <form className={"Content Box"}>
                                <Typography>
                                    <TextField
                                        id="content"
                                        label="Write your comment here..."
                                        multiline
                                        rows="15"
                                        margin="dense"
                                        variant="outlined"
                                        style={{width: 500}}
                                        required
                                        onChange={this.handleChange('commentContent')}
                                    />
                                </Typography>
                            </form>
                        </DialogContent>
                        <DialogActions>
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!this.isFormValid()}
                                onClick={() => {this.handleCreateComment(this.state.post['_id'], 'open')}}
                                >
                                    Submit Comment
                                </Button>
                        </DialogActions>
                    </Dialog>
                </div>
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
)(ViewPost);
