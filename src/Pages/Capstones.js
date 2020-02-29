/*
Filename: Capstones.js
Contributors:
Brenden Detels - Original page functionality
Stephen Tate - Styled page and updated functionality
Ryan Cave - Added all search functionality.
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import LoadingCircle from '../Components/LoadingCircle.js';
import FilterBar from '../Components/FilterBar';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {strapiURL, strapi} from "../constants";
import Fuse from 'fuse.js';

const styles = {
    //Custom color for icon
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
};

class Capstone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchTerm: this.props.match.params,
            key: new Date().getTime(),
            capstones: [],
            sponsors: [],
        }
    }

    async componentDidMount() {
        const posts = await strapi.getEntries('capstones');
        this.setState({loading: false, capstones: posts});
    }

    //Resizes image grid list based on screen size
    static getColumns(props) {
        if(props.width === 'xl'){
            return 5;
        }else if(props.width === 'lg'){
            return 5;
        }else if(props.width ==='md'){
            return 3;
        }
        else if(props.width === 'sm'){
            return 2;
        }
        return 1;
    }

    handleTileClick = (capstoneName) => {
        this.props.history.push("/ViewCapstone/" + capstoneName);
    };

    render() {
        const { classes } = this.props;

        if (!this.state.loading) {

            //Search functionality
            let match;
            let phrase;
            let searchOptions = {
                shouldSort: true,
                threshold: 0.3,
                minMatchCharLength: 1,
                keys: ['CapstoneName',
                'department.name',
                'sponsors.name',
                ]
            };

            if (this.state.searchTerm.searchTerm !== undefined) {
                phrase = this.state.searchTerm.searchTerm;
            }

            if (phrase !== undefined) {
                let fuse = new Fuse(this.state.capstones, searchOptions);
                match = fuse.search(phrase);
            } else {
                match = this.state.capstones;
            }

            return (
                <div className="Blogpost">
                    < FilterBar />

                    {/*Page heading*/}
                    <Grid container justify="center">
                        <Grid item md={10} xs={12}>
                            <Typography variant="h4" style={{marginTop: '16px'}}>Capstone Projects</Typography>
                            <Divider/>
                            <br/>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginBottom: '16px'}}>
                        <Grid item xs={12} md={10}>
                            <GridList cellHeight={250} cols={Capstone.getColumns(this.props)}>
                                {/*Creates a gridlist tile for each capstone*/}
                                {match.map((result, i) => match[i]['DisplayPhoto'] && match[i]['DisplayPhoto'].url != null ? (
                                    <GridListTile key={strapiURL + match[i]['DisplayPhoto'].url} onClick={(e) => this.handleTileClick(result['_id'])}>
                                        {/*The display photo for each gridlisttile*/}
                                        <img src={strapiURL + match[i]['DisplayPhoto'].url} alt={"Capstone"} style={{height: '100%', width: '100%'}}/>
                                        <GridListTileBar
                                            title={result.CapstoneName}
                                            subtitle={"Made by: " + result.moderator.username}
                                            actionIcon={
                                                <IconButton className={classes.icon}
                                                            component={Link}
                                                            to={"/ViewCapstone/" + result['_id']}>
                                                    <InfoIcon/>
                                                </IconButton>
                                            }
                                        >
                                        </GridListTileBar>
                                    </GridListTile>
                                ) : '')}
                            </GridList>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                < FilterBar />
                < LoadingCircle />
            </div>);
    }

}
export default compose(
    withStyles(styles),
    withWidth(),
)(Capstone);



