/*
Filename: ViewYourCapstones.js
Contributors:
Brenden Detels- All functionality
Stephen Tate - Gridlist layout and bug fixes
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {strapiURL, strapi} from "../constants";
import LoadingCircle from "../Components/LoadingCircle";
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import compose from 'recompose/compose';

const styles = {
    card: {
        raised: true,
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
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

class ViewYourCapstones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            capstones: [],
            participatedCapstones: [],
        }
    }
    async componentDidMount() {
        let userID = JSON.parse(localStorage.getItem("USER"))._id;

        //get capstones that are moderated by user
        await strapi.axios.get(strapiURL + '/capstones',{
            params: {
                moderator: userID
            }
        }).then(response =>{
            this.setState({capstones: response.data});
        });

        //get user info to pull user info
        let tempUser = await strapi.getEntry('users', userID);

        //pull each capstone created from list of created capstones
        if(tempUser.createdcapstones.length > 0){
            let tempParticipatedCapstones = [];
            for(let i = 0; i < tempUser.createdcapstones.length; i++){
                let tempCapstone = await strapi.axios.get(strapiURL + '/capstones/' + tempUser.createdcapstones[i]['_id']);
                tempParticipatedCapstones.push(tempCapstone.data);
            }

            console.log(tempParticipatedCapstones);
            this.setState({participatedCapstones: tempParticipatedCapstones});
        }

        this.setState({loading: false});

    }


    static getColumns(props) {
        if(props.width === 'xl'){
            return 4;
        }else if(props.width === 'lg'){
            return 4;
        }else if(props.width ==='md'){
            return 3;
        }

        return 2;
    }

    handleDelete = async (e, resultID) => {
        await strapi.deleteEntry('capstones', resultID);
        this.props.history.push("/");
    };

    handleTileClick = (capstoneName) => {
        this.props.history.push("/ViewCapstone/" + capstoneName);
    };

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            return (
                <div>
                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Your Moderated Capstone Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginBottom: '16px'}}>
                        <Grid item xs={12} md={10}>
                            <GridList cellHeight={250} cols={ViewYourCapstones.getColumns(this.props)}>
                                {this.state.capstones.map((result, i) => (
                                    <GridListTile key={strapiURL + result['DisplayPhoto'].url} onClick={(e) => this.handleTileClick(result.id)}>
                                        <img src={strapiURL + result['DisplayPhoto'].url} alt={"Capstone"} style={{height: '100%', width: '100%'}}/>

                                        <GridListTileBar
                                            title={result.CapstoneName}
                                            subtitle={"Made by: " + result.moderator.username}
                                            actionIcon={
                                                    <Grid container>
                                                        <Grid item xs={3} style={{marginLeft: '2px'}}>
                                                            <IconButton className={classes.icon}
                                                                        component={Link}
                                                                        to={"/ViewCapstone" + result._id}>
                                                                <InfoIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={3} style={{marginLeft: '2px'}}>
                                                            <IconButton className={classes.icon}
                                                                        component={Link}
                                                                        to={"/EditCapstone" + result._id}>
                                                            <CreateIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={3} style={{marginLeft: '2px'}}>
                                                            <IconButton className={classes.icon}
                                                                        onClick={(e) => this.handleDelete(e, result.id)}
                                                                        component={Link}
                                                                        to={"/ViewYourCapstones" + result._id}>
                                                                <DeleteForeverIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>

                                            }
                                        >


                                        </GridListTileBar>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>


                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Your Participated Capstone Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginBottom: '16px'}}>
                        <Grid item xs={12} md={10}>
                            <GridList cellHeight={250} cols={ViewYourCapstones.getColumns(this.props)}>
                                {this.state.participatedCapstones.map((result2, i) => (
                                    <GridListTile key={strapiURL + result2['DisplayPhoto'].url} onClick={(e) => ViewYourCapstones.handleTileClick(result2._id)}>
                                        <img src={strapiURL + result2['DisplayPhoto'].url} alt={"Capstone"} style={{height: '100%', width: '100%'}}/>
                                        <GridListTileBar
                                            title={result2.CapstoneName}
                                            subtitle={"Made by: " + result2.moderator.username}
                                            actionIcon={
                                                <div>
                                                    <Grid container>
                                                        <Grid xs={3}>
                                                            <IconButton className={classes.icon}
                                                                        component={Link}
                                                                        to={"/ViewCapstone/" + result2._id}>
                                                                <InfoIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            }
                                        >


                                        </GridListTileBar>
                                    </GridListTile>
                                ))}
                            </GridList>
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
)(ViewYourCapstones);
