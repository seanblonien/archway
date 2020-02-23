/*
Filename: ViewYourCapstones.js
Contributors:
Brenden Detels- All functionality
Stephen Tate - Gridlist layout and bug fixes
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {strapiURL, strapi} from "../constants";
import LoadingCircle from "../Components/LoadingCircle";
import ProposalForm from "../Components/ProposalForm"
import Divider from '@material-ui/core/Divider';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { Button, List, ListItem } from '@material-ui/core';

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

class ViewYourCapstonesSponsors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            capstones: [],
            pastCapstones: [],
            currentCapstones: [],
            pendingCapstones: [],
        }
    }
    async componentDidMount() {
        let userID = "5e4696cf48645901274f2d0b";

        //get user info to pull user info
        let tempUser = await strapi.getEntry('users', userID);    

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

    static handleTileClick(capstoneName){
        window.location = "/ViewCapstone/" + capstoneName;
    }

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            return (
                <div className="Blogpost">

                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Pending Company Projects</Typography>
                            <ProposalForm></ProposalForm>
                            <Divider/>
                            <br/>
                            <List>
                                <ListItem>
                                    <Typography variant="h6">Project</Typography>
                                    <Typography>Status: Awaiting Approval</Typography>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="h6">Project</Typography>
                                    <Typography>Status: Awaiting Approval</Typography>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Current Company Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>


                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Past Company Projects</Typography>
                            <Divider/>
                            <br/>
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
)(ViewYourCapstonesSponsors);
