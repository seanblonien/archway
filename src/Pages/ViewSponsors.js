/*
Filename: ViewSponsors.js
Contributors:
Stephen Tate - Gridlist layout
Brenden Detels - Page functionality
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LoadingCircle from '../Components/LoadingCircle.js';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {strapiURL, strapi} from "../constants";
import IconButton from "@material-ui/core/IconButton";
import Fuse from "fuse.js";

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

    static handleTileClick(id){
        window.location = "/ViewASponsor/" + id;
    }

    render() {

        const { classes } = this.props;

        if (!this.state.loading) {

            var i = 1;
            var j;
            var key;
            var n = this.state.sponsors.length-1;

            // If there is no search phrase, we sort results alphabetically

            if (this.state.searchTerm.searchTerm === undefined) {
                while (i <= n) {

                    key = this.state.sponsors[i];
                    j = i - 1;
                    while (j >= 0 && this.state.sponsors[j]['name'] > key['name']) {
                        this.state.sponsors[j + 1] = this.state.sponsors[j];
                        j = j - 1;
                    }
                    this.state.sponsors[j + 1] = key;

                    i++;
                }
            }

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
                                    <GridListTile key={strapiURL + result['logo'].url} onClick={(e) => ViewSponsors.handleTileClick(result.id)}>
                                        <img src={strapiURL + result['logo'].url} alt={"Sponsor image"} style={{height: '100%', width: '100%'}}/>
                                        <GridListTileBar
                                            title={result.name}
                                            subtitle={"Sponsors: " + result['capstones'].length  + " capstones"}
                                            actionIcon={
                                                <IconButton className={classes.icon} href={"/ViewASponsor/" + result.id}>
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
