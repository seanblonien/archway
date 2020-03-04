/*
Filename: ViewSponsors.js
Contributors:
Stephen Tate - Gridlist layout
Brenden Detels - Page functionality
 */

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import Fuse from "fuse.js";
import React from 'react';
import {Link} from 'react-router-dom';
import compose from 'recompose/compose';
import LoadingCircle from '../Components/LoadingCircle.js';
import {strapi, strapiURL} from "../constants";

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



class ViewSponsors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sponsors: [],
            searchTerm: this.props.match.params,
        }
    }
    async componentDidMount() {

        const posts = await strapi.getEntries('Sponsors');
        this.setState({loading: false, sponsors: posts});
    }

    static getColumns(props) {
        if(props.width === 'xl'){
            return 5;
        }else if(props.width === 'lg'){
            return 5;
        }else if(props.width ==='md'){
            return 3;
        }

        return 1;
    }

    handleTileClick = (id) => {
        this.props.history.push("/ViewASponsor/" + id);
    };

    render() {

        const { classes } = this.props;

        if (!this.state.loading) {

            // If there is no search phrase, we sort results alphabetically
            let match;
            let phrase;
            let searchOptions = {
                shouldSort: true,
                threshold: 0.3,
                minMatchCharLength: 1,
                keys: ['name',
                ]
            };

            // If there is a search phrase, we retrieve it and perform a new search.
            // If there is no a search phrase, we set match to be the list of all sponsors.

            if (this.state.searchTerm.searchTerm !== undefined) {
                phrase = this.state.searchTerm.searchTerm;
            }

            if (phrase !== undefined) {
                let fuse = new Fuse(this.state.sponsors, searchOptions);
                match = fuse.search(phrase);

            } else {
                match = this.state.sponsors;
            }

            return (

                <div>
                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>View All Sponsors</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginBottom: '16px'}}>
                        <Grid item xs={12} md={10}>
                            <GridList cellHeight={250} cols={ViewSponsors.getColumns(this.props)}>
                                {match.map((result, i) => (
                                    <GridListTile key={strapiURL + result['logo'].url} onClick={(e) => this.handleTileClick(result.id)}>
                                        <img src={strapiURL + result['logo'].url} alt={"Sponsor"} style={{height: '100%', width: '100%'}}/>
                                        <GridListTileBar
                                            title={result.name}
                                            subtitle={"Sponsors: " + result['capstones'].length  + " capstones"}
                                            actionIcon={
                                                <IconButton className={classes.icon}
                                                            component={Link}
                                                            to={"/ViewASponsor/" + result.id}>
                                                    <InfoIcon/>
                                                </IconButton>
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
)(ViewSponsors);
